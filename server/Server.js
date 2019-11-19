//------------------------------ Requires session --------------------------------
//node js requires
var express = require("express");
var passport = require("passport");
LocalStrategy = require("passport-local").Strategy;
var session = require("express-session");
var bodyParser = require("body-parser");
var cors = require("cors");

//our files requires
var signup = require("../Employee/signup");
var login = require("../Employee/login");
var addemployee_acc = require("../Employee/add_employee_acc");
var add_worker = require("../workers/add_worker");
var vl = require("./validation");
const utils = require("../Employee/utils");
const items_category_utils = require("../products/item_categories/item_utils");
const additem_category = require("../products/item_categories/add_item");
const getitem_category = require("../products/item_categories/search_item");
const additem_inventory = require("../products/item_inventory/add_item_inventory");
const getitem_inventory = require("../products/item_inventory/search_item_inventory");
const items_inventory_utils = require("../products/item_inventory/item_inventory_utils");
const inputHandler = require("../extra/inputHandler");
const modifiItem_category = require("../products/item_categories/modifi_item");
const addsupplier = require("../supplier/add_supplier");
const getEmp_kind = require("../extra/checkemp_kind");
const server_utils = require("../extra/server_utils");

//------------------------------ app.use() session --------------------------------
//Intiate Server App
var app = express();
//enable cross origin request
app.use(cors());
//Parses Request Body - TO DO LOOK INTO TWO BODY PARSER EFFECT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//define session variables
app.use(
  session({
    secret: "Shh, its a secret!",
    resave: true,
    saveUninitialized: true
  })
);
//passport local strategy definition
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(email, password, done) {
      response = { email: email, password: password };
      login.login(response).then(user => {
        if (user.result) return done(null, user);
        else return done(null, false, { message: user.details });
      });
    }
  )
);
//intialize passport
app.use(passport.initialize());
//define passport session
app.use(passport.session());

//------------------------------ Other internal function session --------------------------------
//intialize serialize passport function
passport.serializeUser(function(user, done) {
  done(null, user.result.email);
});
//intialize deserialize passport function
passport.deserializeUser(function(email, done) {
  utils.user_utils.getuserData(email).then(userdata => {
    done(null, userdata.result);
  });
});

//------------------------------ Our internal function session --------------------------------
function set_passwordValidation(validation_list) {
  //check if password in valid format or not
  vl.validation.setpasswordValidator(validation_list);
}
//set password validation rules
set_passwordValidation(["min", "max"]);

//------------------------------ User handler requests session --------------------------------
//signup request
app.post("/signup", function(req, res) {
  console.log("request signup recieved");
  // Prepare output in JSON format
  response = {
    empolyee_id: "",
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  };
  signup.signup(response).then(value => {
    res.send(value);
  });
});
//login request
app.post("/login", function(req, res, next) {
  console.log("request login recieved");
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send(info.message);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.send(user.details);
    });
  })(req, res, next);
});

//addWorkers request
app.post("/addworker", function(req, res) {
  console.log("request addworker recieved");
  //kind = getEmp_kind.checkEmpKid(req.body.uuid)
  //if (kind === 'BOSS' || kind === 'SUPER') {
  // Prepare output in JSON format
  response = {
    salary: req.body.salary,
    employee_worker_uuid: "",
    employee_worker_ssn: req.body.ssn,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    employee_supervisor_uuid: "35880958-b281-4409-913e-59c73e137abb"
  };
  add_worker.add_worker(response).then(value => {
    res.send(value);
  });
  //res.send("success");
  /* }else {
    res.send({
      success: false,
      message: "don't have permission in db",
      errors: ["You don't have permission"]
    });
  }*/
});

//addWorkers request
app.get("/addemployee_acc", function(req, res) {
  console.log("request addemployee_acc recieved");
  kind = getEmp_kind.checkEmpKid(req.body.uuid);
  if (kind === "BOSS" || kind === "SUPER") {
    // Prepare output in JSON format
    response = {
      email: req.body.email,
      password: req.body.password,
      employee_uuid: employee_uuid
    };
    addemployee_acc.add_employeeAcc(response).then(value => {
      res.send(value);
    });
    res.send("success");
  } else {
    res.send({
      success: false,
      message: "don't have permission in db",
      errors: ["You don't have permission"]
    });
  }
});

//get all data all rows for users
app.post("/getallworkers", function(req, res) {
  console.log("request getallusers recieved");
  utils.user_utils.getallUserData().then(value => {
    res.send(value);
  });
});
//------------------------------ Items handler requests session --------------------------------
//------------- Items_Category handler requests session -------------
//add new item request
app.post("/additem_category", function(req, res) {
  // Prepare output in JSON format
  console.log("request additem_category recieved");
  console.log(req.body);
  response = {
    barcode: req.body.barcode,
    item_uuid: "",
    name: req.body.name,
    sell_price: req.body.sell_price,
    buy_price: req.body.buy_price,
    description: req.body.description,
    in_stock: 0
  };
  additem_category.addItem(response).then(value => {
    res.send(value);
  });
});
//search exist item request
app.post("/getitem_category", function(req, res, next) {
  console.log("request getitem_category recieved");
  response = {
    barcode: req.body.barcode
  };
  getitem_category.getitemData(response).then(value => {
    res.send(value);
  });
});

//modifi item request
app.post("/modifiitem", function(req, res, next) {
  console.log("request modifiItem recieved");
  response = inputHandler.handler.itemName_jsonHandler(req.body);
  modifiItem_category.modifiitemData(response).then(value => {
    res.send(value);
  });
});

//get all data all rows for users
app.post("/getallitems_categories", function(req, res) {
  console.log("request getallitems_categories recieved");
  items_category_utils.utils.getallItemData().then(value => {
    res.send(value);
  });
});

//------------- Items_Inventory handler requests session -------------
//add new item request
app.post("/additem_toinventory", function(req, res) {
  // Prepare output in JSON format
  console.log("request additem_toinventory recieved");
  response = {
    entry_date: req.body.entry_date,
    storage_time: "2019-11-25",
    contain_no: parseInt(req.body.contain_no),
    item_type: req.body.item_type,
    item_barcode: req.body.item_barcode,
    item_uuid: "",
    incoming_order_uuid: null,
    outgoing_order_uuid: null,
    description: req.body.description,
    physcitem_uuid: ""
  };
  additem_inventory.addItemInventory(response).then(value => {
    res.send(value);
  });
});

//get all data all rows for users
app.post("/getallitems_inventory", function(req, res) {
  console.log("request getallitems_inventory recieved");
  items_inventory_utils.inventoryUtils.getallItemDataInventory().then(value => {
    res.send(value);
  });
});

//------------------------------ Items handler requests session --------------------------------
//add new supplier
app.post("/addsupplier", function(req, res) {
  // Prepare output in JSON format
  console.log("request addsupplier recieved");
  response = {
    name: req.body.name,
    supplier_uuid: "",
    phone_no: req.body.phone_no,
    address: req.body.address,
    description: req.body.description
  };
  addsupplier.addSupplier(response).then(value => {
    res.send(value);
  });
});

//get all data all rows for users
app.post("/getallsuppliers", function(req, res) {
  console.log("request getallsuppliers recieved");
  items_inventory_utils.inventoryUtils.getallSupplierData().then(value => {
    res.send(value);
  });
});

//------------------------------ Other handler requests session --------------------------------
//qr codes generator pdf request
app.post("/generate_barcodes_pdf", function(req, res) {
  console.log("request generate_barcodes_pdf recieved");
  server_utils.serverUtils
    .generate_PdfBarcodes(req.body.barcode_datalist)
    .then(value => {
      console.log("sending file");
      var file = fs.createReadStream("./file.pdf");
      file.pipe(res);
      console.log("done");
    });
});
//defaullt request handler
app.get("/", function(req, res) {
  if (req.user) {
    res.send("You visited this page " + req.user.email + " times");
  } else {
    res.send("Welcome to this page for the first time!");
  }
});
//web page request
app.get("/index.html", function(req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

//------------------------------ Server session --------------------------------
//server listner
var server = app.listen(5000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
