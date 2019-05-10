const db = require('./db');

db.all('SELECT * FROM contacts', function (err, contacts) {
  console.log(contacts);
});