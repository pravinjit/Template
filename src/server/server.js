const express = require("express");
const mysql = require("mysql");
// const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "pravin",
  database: "pravin",
});

// connection.connect();

app.use([cors(), bodyParser.json()]);

app.post("/getList", async (req, res) => {
  let totdoList = await new Promise((resolve, reject) =>
    connection.query(
      `SELECT * from todolist where email = '${req.body.UserEmail}' `,
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    )
  );
  res.json(totdoList);
});

app.post("/addList", async (req, res) => {
  await new Promise((resolve, reject) =>
    connection.query(
      `INSERT INTO todolist(title, description, email) VALUES ('${req.body.title}', '${req.body.description}','${req.body.email}')`,
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    )
  );
  res.json({ status: "success" });
});

app.get("/getService", async (req, res) => {
  let serviceList = await new Promise((resolve, reject) =>
    connection.query(`SELECT * from service_list`, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    })
  );
  res.json(serviceList);
});

app.post("/updateList", async (req, res) => {
  if (req.body.type === "edit") {
    await new Promise((resolve, reject) =>
      connection.query(
        `UPDATE todolist SET title = '${req.body.title}',  description = '${req.body.description}' WHERE  todo_id = '${req.body.id}'`,
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      )
    );
  }
  if (req.body.type === "status") {
    await new Promise((resolve, reject) =>
      connection.query(
        `UPDATE todolist SET status = '${
          req.body.status === true ? 1 : 0
        }' WHERE todo_id = '${req.body.id}'`,
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      )
    );
  }
  if (req.body.type === "delete") {
    await new Promise((resolve, reject) =>
      connection.query(
        `DELETE FROM todolist WHERE todo_id = '${req.body.id}'`,
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      )
    );
  }
  res.json({ status: "success" });
});

app.listen(3001, () => {
  console.log("server started at 3001");
});
