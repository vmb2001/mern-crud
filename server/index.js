const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

//Create connection to mysql
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password123?",
  database: "cruddb",
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//GET API endpoint
app.get("/api", (req, res) => {
  const sqlSelect = "SELECT * FROM customers";
  db.query(sqlSelect, (err, rslt) => {
    if (err) {
      res.send(`error:${err}`);
    } else res.send(rslt);
  });
});

//POST API endpoint
app.post("/api/customers", (req, res) => {
  const {
    email,
    first_name,
    last_name,
    ip,
    latitude,
    longitude,
    created_at,
    updated_at,
  } = req.body;
  const sqlAdd =
    "INSERT INTO customers(email,first_name,last_name,ip,latitude,longitude,created_at)VALUES(?,?,?,?,?,?,?)";
  db.query(sqlAdd, [
    email,
    first_name,
    last_name,
    ip,
    latitude,
    longitude,
    created_at,
  ]);
});

//DELETE API endpoint
app.delete("/api/customers:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  sqlDelete = "DELETE FROM customers WHERE id = ?";
  db.query(sqlDelete, id, (err, result) => {
    if (err) console.log(`Error occured in delete${err}`);
  });
});

//PATCH API end point
app.patch("/api/customers:id", (req, res) => {
  const id = req.params.id;
  const { email, first_name, last_name, ip, latitude, longitude, updated_at } =
    req.body;
  console.log(updated_at);
  sqlUpdate =
    "UPDATE customers SET email = ?,first_name = ?,last_name= ?,ip=?, latitude= ?,longitude=?,updated_at= ? WHERE id = ?";
  db.query(
    sqlUpdate,
    [email, first_name, last_name, ip, latitude, longitude, updated_at, id],
    (err, result) => {
      if (err) console.log(`Error occured ${err}`);
      else console.log(result);
    }
  );
});

app.listen(3001, () => {
  console.log("listening at 3001...");
});
