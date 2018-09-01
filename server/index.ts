/**
 * Created by agrawam on 01/09/18.
 */
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('contacts', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the contacts SQlite database.');
});

db.serialize(function() {
  let sql_user_info = "CREATE TABLE if not exists user_info (" +
    "userId INTEGER PRIMARY KEY," +
    "password TEXT NOT NULL," +
    "firstName TEXT NOT NULL," +
    "lastName TEXT NOT NULL," +
    "emailId TEXT NOT NULL," +
    "aadharNum TEXT," +
    "phoneNum TEXT )";

  let sql_group = "CREATE TABLE if not exists groups (" +
    "groupId INTEGER PRIMARY KEY," +
    "groupName TEXT NOT NULL," +
    "isActive INTEGER NOT NULL )";

  let sql_contacts = "CREATE TABLE if not exists contacts (" +
    "contactId INTEGER PRIMARY KEY," +
    "firstName TEXT NOT NULL," +
    "lastName TEXT NOT NULL," +
    "emailId TEXT NOT NULL," +
    "phoneNum TEXT," +
    "groupId INTEGER  )";

  db.run(sql_contacts);
  db.run(sql_group);
  db.run(sql_user_info);
  /*var stmt = db.prepare("INSERT INTO user_info VALUES (?)");
  for (var i = 0; i < 10; i++) {
    stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM user_info", function(err, row) {
    console.log(row.id + ": " + row.info);
  });*/
});

db.close();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
