exports.register = register;
const db = require("../basic_db_cmd/basicDB.js").db;
const chooseDB = require("../basic_db_cmd/basicDB").chooseDB;
function accountHasExistedFunc(account) {
  const selectAccountSql =
    "select 1 from user_info_table where account =  " + account + " limit 1";
  const promise = new Promise((resolve, reject) => {
    db.query(selectAccountSql, (err, result) => {
      if (err) reject(err);
      else {
        resolve([result[0]]);
      }
    });
  });
  return promise;
}

async function register(req, result) {
  chooseDB();
  const newUserInfo = req.body;
  await accountHasExistedFunc(newUserInfo.account).then((res) => {
    const addNewUserInfoSql = "INSERT INTO user_info_table SET ?";
    let normalJson = {
      code: 1,
      msg: "create user success",
      userInfo: newUserInfo,
    };

    let accountExistedJson = {
      code: 2,
      msg: "account existed",
      userInfo: newUserInfo,
    };

    if (res[0] && res[0][1] !== undefined) {
      json = {
        code: 2,
        msg: "account existed",
        userInfo: newUserInfo,
      };
      result.send(accountExistedJson);
      return;
    }

    db.query(addNewUserInfoSql, newUserInfo, (err, res) => {
      if (err) throw err;
      else {
        normalJson.userInfo.id = res.insertId
        result.send(normalJson);
      }
    });
  });
}
