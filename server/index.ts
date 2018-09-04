/**
 * Created by agrawam on 01/09/18.
 */
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
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

  //db.close();
});


app.get('/', (req, res) => res.send('Hello World!'));

app.post('/svc/employee/register', (req, res) => {
  console.log(req.body);
  db = new sqlite3.Database('contacts', (err) => {
    if (err) {
      return console.error(err.message);
    }
    db.run("INSERT into user_info(password,firstName,lastName, emailId, phoneNum, aadharNum) " +
      "VALUES ('" + req.body.password + "','" +
      req.body.firstName + "','" +
      req.body.lastName + "','" +
      req.body.emailId + "','" +
      req.body.phoneNum + "','" +
      req.body.aadhar + "')");
    //db.close();
    res.send();
  });
});

app.post('/svc/employee/login', (req, res) => {
  //Perform SELECT Operation
  db = new sqlite3.Database('contacts', (err) => {
    if (err) {
      return console.error(err.message);
    }
    db.all("SELECT * from user_info where emailId='" + req.body.userName + "' AND password='" + req.body.password + "'", function (err, rows) {
      console.log(rows);
      console.log(err);

      //db.close();
      if(err) {
        res.status(500).send("Error Logging In");
      }
      else {
        if(rows.length > 0) {
          var response = {
            userId:rows[0].userId
          }
          res.send(JSON.stringify(response));
        }
        else {
          res.status(404).send("Invalid User Id or Password");
        }
      }
    });
  });
});


app.post('/svc/group/create', (req, res) => {
  console.log(req.body);
  db = new sqlite3.Database('contacts', (err) => {
    if (err) {
      return console.error(err.message);
    }
    db.run("INSERT into groups(groupName, userId,isActive) " +
      "VALUES ('" + req.body.groupName + "'," + req.body.userId + ",1)", function (err, rows) {
      //db.close();
      console.log(err);
      console.log(rows);
      res.send(JSON.stringify(rows));
    });

  });
});

app.get('/svc/groups/:userId', (req, res) => {
  db = new sqlite3.Database('contacts', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(req.params.userId);
    db.all("SELECT * from groups where userId=" + req.params.userId, function (err, rows) {
      //db.close();
      if(err) {
        res.status(500).send("Error fetching groups");
      }
      else {
        if(rows.length > 0) {
          res.send(JSON.stringify(rows));
        }
        else {
          res.status(404).send("No groups found");
        }
      }
    });
  });
});


app.delete('/svc/group/:groupId', (req, res) => {
  db = new sqlite3.Database('contacts', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(req.params.groupId);
    db.run("DELETE FROM groups WHERE groupId=" + req.params.groupId, function (err, rows) {
      //db.close();
      if(err) {
        res.status(500).send("Error deleting groups");
      }
      else {
       res.send();
      }
    });
  });
});



app.post('/svc/contacts/create', (req, res) => {
  console.log(req.body);
  db = new sqlite3.Database('contacts', (err) => {
    if (err) {
      return console.error(err.message);
    }
    db.run("INSERT into contacts(firstName,lastName, emailId, phoneNum, groupId, isActive) " +
      "VALUES ('" + req.body.firstName + "','" +
      req.body.lastName + "','" +
      req.body.emailId + "','" +
      req.body.phoneNum + "'," +
      req.body.groupId + ", 1)");
    //db.close();
    res.send();

  });
});


app.get('/svc/group/contacts/:groupId', (req, res) => {
  db = new sqlite3.Database('contacts', (err) => {
    if (err) {
      return console.error(err.message);
    }
    db.all("SELECT * from contacts where groupId = " + req.params.groupId, function (err, rows) {
      //db.close();
      if(err) {
        res.status(500).send("Error fetching contacts");
      }
      else {
        res.send(JSON.stringify(rows));
      }
    });
  });
});

app.put('/svc/group/active', (req, res) => {
  db = new sqlite3.Database('contacts', (err) => {
    if (err) {
      return console.error(err.message);
    }
    let sql = `UPDATE groups
            SET isActive = ?
            WHERE groupId = ?`;

    db.run(sql, [req.body.active, req.body.groupId], function (err, rows) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row(s) updated: ${this.changes}`);


      res.send();
    });
    //db.close();
  });
});


app.put('/svc/contacts/deactive', (req, res) => {
  db = new sqlite3.Database('contacts', (err) => {
    if (err) {
      return console.error(err.message);
    }
    let sql = `UPDATE contacts
            SET isActive = ?
            WHERE contactId = ?`;
    console.log(req.body);
    for(let contact in req.body) {
      db.run(sql, [0, req.body[contact].contactId], function (err, rows) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);

      });
    }
    res.send();
    //db.close();
  });
});



app.put('/svc/contacts/active', (req, res) => {
  db = new sqlite3.Database('contacts', (err) => {
    if (err) {
      return console.error(err.message);
    }
    let sql = `UPDATE contacts
            SET isActive = ?
            WHERE contactId = ?`;
    for(let contact in req.body) {
      db.run(sql, [1, req.body[contact].contactId], function (err, rows) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);

      });
    }

    res.send();

    //db.close();
  });
});


app.post('/svc/contacts/delete', (req, res) => {
  db = new sqlite3.Database('contacts', (err) => {
    if (err) {
      return console.error(err.message);
    }
    let sql = `DELETE FROM contacts WHERE contactId=?`;
    for(let contact in req.body) {
      db.run(sql, req.body[contact].contactId, function (err, rows) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Row(s) Deleted: ${this.changes}`);

      });
    }

    res.send();

    //db.close();
  });
});




app.listen(3000, () => console.log('Example app listening on port 3000!'));
