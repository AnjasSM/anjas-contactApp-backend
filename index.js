const express = require("express")
const app = express()
const db = require("./component/db")
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header( "Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
  next()
})

//port declaration
const port = 4000
app.listen(port, () => {
  console.log(`Server Running On port ${port}`);
});

//homepage
app.get('/', (req, res, next) => {
  res.send(`Backend Running on Port : ${port}`);
});



// get contacts from db
app.get("/contacts",(req,res,next) => {

  const sql = 'select * from contacts'
  db.all(sql, (err, data) => {  
      if (err)  res.json({"error":err.message})
 
      res.json(data)
    })
})

// get contact by id from db
app.get("/contacts/:id", (req,res,next) => {
  const sql = "select * from contacts where id = ?"
  const param = req.params.id

  db.get(sql,param, (err,data) => {
      if(err) res.json({"error" : err.message})
      res.json(data)
  })
})

//add contact to db
app.post("/contacts" , (req,res,next) => {
  const sql = "insert into contacts(name,phone,email,gender) values(?,?,?,?)"
  const params = [req.body.name,req.body.phone,req.body.email,req.body.gender]

  db.run(sql,params, (err,data) => {
      if(err) res.json({"error" : err.message})
      res.json({"message" : "contact added"})
  })
})

// delete contact from db
app.delete("/contacts/:id", (req,res,next) => {
  const sql = "delete from contacts where id = ?"
  const param = req.params.id

  db.run(sql,param, (err,data) => {
      if(err) res.json({"error" : err.message})
      res.json({"message" : "contact Deleted"})
  })
})

//update contact from db
app.put("/contacts/:id", (req,res,next) => {
  const sql =`update contacts set 
      name = ?,
      phone = ?, 
      email = ?,
      gender = ?
      where id = ?`
  const params = [req.body.name, req.body.phone, req.body.email,req.body.gender,req.params.id]

  db.run(sql,params, (err,data) => {
      if(err) res.json({"error" : err.message})
      res.json({"message" : "contact edited"})
  })

})

// get contact by gender
app.get("/contacts/gender/:value",(req,res,next) => {

  const sql = 'select * from contacts where gender = ?'
  const param = req.params.value
  db.all(sql, param,  (err, data) => {  
      if (err)  res.json({"error":err.message})
      res.json(data)
    })
})

//get contact by search value
app.get("/contacts/search/:value", (req,res,next) => {
  const sql = "select * from contacts where fullName like ? "
  const param = "%" + req.params.value + "%"
  db.all(sql, param,  (err, data) => {  
      if (err)  res.json({"error":err.message})
      res.json(data)
    })
})


//get users from db
app.get("/users", (req,res,next) => {
  const sql = "select * from users"
  db.all(sql, (err, data) => {  
    if (err)  res.json({"error":err.message})

    res.json(data)
  })
})

// get user by id from db
app.get("/users/:id", (req,res,next) => {
  const sql = "select * from users where id = ?"
  const param = req.params.id

  db.get(sql,param, (err,data) => {
      if(err) res.json({"error" : err.message})
      res.json(data)
  })
})

//add user to db
app.post("/users", (req,res,next) => {
  const sql = "insert into users(username,email,password) values(?,?,?)"
  const params = [req.body.username, req.body.email, req.body.password]

  db.run(sql,params, (err,data) => {
    if(err) res.json({"error" : err.message})
    res.json({"message" : "user added"})
  })
})

//delete user from db
app.delete("/users/:id", (req,res,next) => {
  const sql = "delete from users where id = ?"
  const param = req.params.id

  db.rub(sql,param, (err,data) => {
    if(err) res.json({"error" : err.message})
    res.json({"message" : "user deleted"})
  })
})

//update user from db
app.put("/users/:id", (req,res,next) => {
  const sql =`update users set 
      username = ?, 
      email = ?,
      password = ?
      where id = ?`
  const params = [req.body.userName, req.body.email,req.body.password,req.params.id]

  db.run(sql,params, (err,data) => {
      if(err) res.json({"error" : err.message})
      res.json({"message" : "user edited"})
  })

})