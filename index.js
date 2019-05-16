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



// get contact from database
app.get("/contacts",(req,res,next) => {

  const sql = 'select * from contacts'
  db.all(sql, (err, data) => {  
      if (err)  res.json({"error":err.message})
 
      res.json(data)
    })
})

// get data by id from database
app.get("/contacts/:id", (req,res,next) => {
  const sql = "select * from contacts where id = ?"
  const param = req.params.id

  db.get(sql,param, (err,data) => {
      if(err) res.json({"error" : err.message})
      res.json(data)
  })
})

//add data to database
app.post("/contacts" , (req,res,next) => {
  const sql = "insert into contacts(name,phone,email,gender) values(?,?,?,?)"
  const params = [req.body.name,req.body.phone,req.body.email,req.body.gender]

  db.run(sql,params, (err,data) => {
      if(err) res.json({"error" : err.message})
      res.json({"message" : "data added"})
  })
})

// delete 
app.delete("/contacts/:id", (req,res,next) => {
  const sql = "delete from contacts where id = ?"
  const param = req.params.id

  db.run(sql,param, (err,data) => {
      if(err) res.json({"error" : err.message})
      res.json({"message" : "data Deleted"})
  })
})

//update data
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
      res.json({"message" : "data edited"})
  })

})
