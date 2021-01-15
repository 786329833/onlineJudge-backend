const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");

// post的头设置为json格式,不加以下两行则body为空
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3456, () => console.log("Example app listening on port 3000!"));

// 请修改连接本地MySQL的user与password！！！！确保服务端正确运行
// 请修改连接本地MySQL的user与password！！！！确保服务端正确运行
// 请修改连接本地MySQL的user与password！！！！确保服务端正确运行

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
app.get("/choosedb", function (req, res) {
  const chooseDatabaseSql = "use todos";
  db.query(chooseDatabaseSql, (err, result) => {
    if (err) {
    } else {
      res.send("choose db success");
    }
  });
});

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
