
const db    = require('./db');
const args  = process.argv.slice(2);
const query = `INSERT INTO contacts (name, phone, email, gender)
               VALUES ('${args[0]}', '${args[1]}', '${args[2]}', '${args[3]}')`;

db.run(query, function (err) {
  if (err) throw err;
  console.log('New Contact Has Been created!');
});