'use strict'

const express = require("express");
const app=express();
const { validationResult, body } = require('express-validator');
app.set('view engine','ejs');

// Middleware très important pour les formulaires car il permet de décoder le corps des requêtes
app.use(express.urlencoded({ extended: false }));

const port=3000;

const routes = {
  "/":"list routes",
  "/users":"return users",
  "/users/:id": "return user",
  "/users/role/admin": "return list of admin",
  "/users/role/user": "return list of users"
}

const users= [{name: "max", role: "admin"}, {name: "Vanessa", role: "user"}] //correction ajouter id


app.get("/admin",(req,res)=>{
  res.render('admin',{users: users})
})

app.post("/admin",body('user').notEmpty().escape(),(req,res)=>{
  const result= validationResult(req);
  if (result.isEmpty()){
    const user=req.body;
    user.role='user';
    users.push(user);
    return res.redirect('/users');
  }
  res.send({errors: result.array()});
})

app.get("/",(req,res)=>{
  res.json(routes)
})

app.get("/users",(req,res)=>{
  res.json(users)
})

app.get("/users/:id",(req,res)=>{
  let id=req.params.id;
  res.json(users[id-1]);
})

app.get("/users/role/admin",(req,res)=>{
  let admin=[]
  for(let i in users){
    console.log(users[i])
    if(users[i].role === "admin"){
      admin.push(users[i]);
    }
  }
  res.json(admin)
})

app.get("/users/role/user",(req,res)=>{
// utiliser la methode filter
  for(let i in users){
    if(users[i].role === "user"){
      res.json(users[i])
    }
  }
})

app.listen(port, ()=>{
  console.log(`Server running on port ${port}/`);
});

