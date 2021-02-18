const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
});

exports.db = db;
exports.chooseDB = function (req, res) {
  const chooseDatabaseSql = "use online_judge";
  db.query(chooseDatabaseSql, (err, result) => {
    if (err) throw err;
  });
};
