const pg = require("pg");
var jsonSql = require("json-sql")();

const url = {
  user: "postgres",
  host: "localhost",
  database: "WMS_Database",
  password: "123",
  port: 5432
};

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
String.prototype.replaceAt=function(index, replacement) {
  return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function queryGenerator(
  query_type,
  query_table,
  values_list,
  condition,
  modifiers
) {
  var sql = jsonSql.build({
    type: query_type,
    table: query_table,
    fields: Object.keys(values_list),
    values: values_list,
    condition: condition,
    modifier: modifiers
  });

  query = {
    text: fixQuery(sql.query),
    values: Object.values(sql.values)
  };
  return query;
}

// for connection information
var client = new pg.Client(url);
client.connect();

const quiries = {

  async insert(table,values) {
    try {
        const res = await client.query(queryGenerator("insert",table,values));
        if (res.rowCount > 0)
        return true;     
        else 
        return false;
    } 
    catch (error) {return error;}
  },
   
  async isExist(table,values,condition) {
    try {
        const res = await client.query(queryGenerator("select",table,values,condition));
        if (res.rowCount > 0)
        return true     
        else 
        return false;
    } 
    //for all catch must send to class to classifi error to get useful details about error
    catch (error) {return error;}
  },

  async getData(table,values,condition) {
    try {
        const res = await client.query(queryGenerator("select",table,values,condition));
        if (res.rowCount > 0)
            return res.rows[0];     
        else 
            return null;
    } 
    catch (error) {return error;}
  },

  async getallData(table,values,condition) {
    try {
        const res = await client.query(queryGenerator("select",table,values,condition));
        if (res.rowCount > 0)
            return res.rows;     
        else 
            return null;
    } 
    catch (error) {return error;}
  },

  async modifiData(table,condition,modifiers) {
    try {
        const res = await client.query(queryGenerator("update",table,{},condition,modifiers));
        if (res.rowCount > 0)
            return true;     
        else 
            return false;
    } 
    catch (error) {return error;}
  },

  async check_emp_kind(uuid) {
    table = `WITH T1 AS (
      SELECT employee_boss_uuid as uuid,'BOSS' AS EMP_KIND FROM employee_boss
      ),
      T2 AS (
      SELECT employee_supervisor_uuid as uuid,'SUPER' AS EMP_KIND FROM employee_supervisor
      ),
      T3 AS (
      SELECT employee_worker_uuid as uuid,'WORKER' AS EMP_KIND FROM employee_worker
      ),
      T4 AS (
      SELECT * FROM T1
      UNION
      SELECT * FROM T2
      UNION
      SELECT * FROM T3
      )
      select emp_kind from T4`
      query = queryGenerator("select",table,{},{uuid:uuid})
      query.text=fixQuery(query.text,' "')
      query.text=fixQuery(query.text,'4"')
      //query.text[query.text.length-12]='"'
      query.text=query.text.replaceAt(query.text.length-12, '"u')
      query.text = query.text.substr(14,query.text.length)

      return (await client.query(query)).rows[0].emp_kind;
  },

  async uuidGenerator() {
    return (await client.query("select uuid_generate_v1()")).rows[0].uuid_generate_v1;
  }
};

exports.quiries = quiries