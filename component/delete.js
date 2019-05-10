const db    = require('./db');
const args  = process.argv.slice(2);
const query = `DELETE FROM contacts WHERE id=${args[0]}`;

db.run(query, function (err) {
  if (err) throw err;
  console.log('contact deleted!');
});