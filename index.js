const express = require('express');
const app = express();
const db = require('./component/db');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//port declaration
const port = 3000;

app.listen(port, () => {
  console.log(`Server Running On port ${port}`);
});

//get ui from index.html
app.get('/', (req, res, next) => {
  res.sendfile('./public/index.html');
});

//get all contacts database
app.get('/contacts', (req,res,next) => {
  const sql = 'SELECT * FROM contacts';
  db.all(sql, (err, data) => {
    if(err) {
      res.status(400).json({'error':'err.message'});
      return;
    }
    res.json({
      'message': 'success',
      'data':data
    })
  });
});

//get single contact by id
app.get('/contacts/:id', (req, res, next) => {
  const sql = 'SELECt * FROM contacts WHERE id = ?';
  const params = req.params.id;

  db.get(sql,params, (err, data) => {
    if(err) {
      res.status(400).json({'error':'err.message'});
      return;
    }
    res.json({
      'message': 'success',
      'data':data
    })   
  });
});

//add new contact to database
app.post('/contacts', (req, res, next) => {
  const sql = 'INSERT INTO contacts (name, phone, email, gender) VALUES (?, ?, ?, ?)';
  const params = [req.body.name, req.body.phone, req.body.email, req.body.gender];

  db.run(sql, params, (err, data) => {
    if(err) {
      res.status(400).json({'error':'err.message'});
      return;
    }
    res.json({
      'message': 'New Contact Added',
      'data': data,
      'id': this.lastID
    })
  });
});

//update contacts database
app.put('/contacts/:id', (req, res, next) => {
  const sql = `UPDATE contacts set 
                name = ?,
                phone = ?,
                email = ?,
                gender = ?,
                WHERE id = ?`;
  const params = [req.body.name, req.body.phone, req.body.email, req.body.gender, req.params.id];

  db.run(sql, params, (err, data) => {
    if(err) {
      res.status(400).json({'error':'err.message'});
      return;
    }
    res.json({
      'message': 'Contact Updated'
    })
  });
});

//delete contact from database use contact id
app.delete('/contacts/:id', (req, res, next) => {
  const sql = 'DELETE FROM contacts WHERE id = ?';
  const params = req.params.id;

  db.run(sql, params, (err, result) => {
    if(err) {
      res.status(400).json({'error':'err.message'});
      return;
    }
    res.json({
      'message': 'Contact Deleted',
      'changes': this.changes
    });
  });
});
