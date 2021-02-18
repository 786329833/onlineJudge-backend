const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const basicDBFun = require('./api/basic_db_cmd/basicDB.js');
const loginApi = require('./api/user_infomation/register.js');
// import { login } from 'user_infomation/login';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3456, () => console.log("Example app listening on port 3456!"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
});

// 连接服务器
db.connect((err) => {
  if (err) throw err;
  console.log("connect success");
});

// 测试
// 创建数据库todos
app.get("/createdb", function (req, res) {
  const createDatabaseSql = "CREATE DATABASE IF NOT EXISTS todos";
  db.query(createDatabaseSql, (err, result) => {
    if (err) {
    } else {
      res.send("create db success");
    }
  });
});

// 选择数据库todos
app.get("/choosedb", basicDBFun.chooseDB);

app.post("/register", loginApi.register);

// 建立todos_table表
app.get("/createTable", function (req, res) {
  const createTableSql = `CREATE TABLE IF NOT EXISTS todos_table(
    id INT UNSIGNED AUTO_INCREMENT,
    text VARCHAR(100) NOT NULL,
    completed bool NOT NULL,
    PRIMARY KEY (id)
 )ENGINE=InnoDB DEFAULT CHARSET=utf8`;
  db.query(createTableSql, (err, result) => {
    if (err) {
    } else {
      res.send("create todos_table success");
    }
  });
});

// 查询
app.get("/queryTodos", function (req, res) {
  const queryTodosSql = "select * from todos_table";
  db.query(queryTodosSql, (err, result) => {
    if (err) {
    } else {
      res.send(result);
    }
  });
});

// 增加
app.post("/addTodo", function (req, res) {
  const newTodo = req.body;
  const addTodoSql = "INSERT INTO todos_table SET ?";
  db.query(addTodoSql, newTodo, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

// 删除
app.post("/deleteTodo", function (req, res) {
  const deletedTodo = req.body;
  const deleteTodoSql = "delete from todos_table where id = " + deletedTodo.id;
  console.log(deleteTodoSql);
  db.query(deleteTodoSql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

// 修改
app.post("/updateTodo", function (req, res) {
  const updateTodo = req.body;
  const updateTodoSql =
    "UPDATE todos_table SET text='" +
    updateTodo.text +
    "', completed= " +
    updateTodo.completed +
    " WHERE id=" +
    updateTodo.id;
  console.log(updateTodoSql);
  db.query(updateTodoSql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});
