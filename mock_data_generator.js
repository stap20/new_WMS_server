var jsonSql = require("json-sql")();

function fixQuery(query_text,target_remove = "$p") {
  var idx = query_text.indexOf(target_remove);
  var iterate = 0
  while (idx >= 0 && iterate < query_text.length) {
    first = query_text.substr(0, idx + 1);
    last = query_text.substr(idx + 2, query_text.length - 1);

    query_text = first + last;
    idx = query_text.indexOf(target_remove);
    iterate++;
  }

  return query_text;
}

function queryGenerator(
  query_type,
  query_table,
  values_list,
  condition,
  modifiers,
  join_json
) {
  var sql = jsonSql.build({
    type: query_type,
    table: query_table,
    fields: Object.keys(values_list),
    values: values_list,
    condition: condition,
    modifier: modifiers,
    join:[join_json]
  });

  query = {
    text: fixQuery(sql.query),
    values: Object.values(sql.values)
  };
  return query;
}

query=queryGenerator("select","order",{},{},{},{type:"inner",table:"customer",on:{'order.id':'customer.id'}})
console.log(query.text)