const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bycrypt = require("bcrypt");
const Joi = require("joi");
//const pug = require('pug');
const user = require('./controllers/user.js');
const admin = require('./controllers/admin.js');


var app = express();

mongoose.connect('mongodb://localhost/server')
    .then(()=>console.log("mongodb connected successfully...."))
    .catch( err => console.error("mongodb connected failed opssss....!"))


mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));


app.set('view engine' , 'ejs');


app.use(express.static(__dirname + '/public'));


app.use('/user' , user);

app.use('/admin' , admin);



app.listen(3000 , ()=>{
    console.log("server is run on port 3000");
})





////////////////////////////////////////////////////mohammad
// const express = require('express');
// const bodyParser = require('body-parser');
// const path  = require('path');
// const mongoose= require('mongoose');
// const fs = require('fs');
// const usersController = require('./controllers/users');
// const adminController = require('./controllers/admin');
// let jsonParser = bodyParser.json();
// let urlencoded =  bodyParser.urlencoded({extended:false});
// const app= express();
// app.set('view engine', 'ejs');
// app.use(jsonParser);
// app.use(urlencoded);
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/admin', adminController);
// app.use('/users', usersController);
// app.use('/', (req, res, next)=>{
//     res.send('Home page');
// })
// mongoose.connect("mongodb://localhost/nodjs",{ useUnifiedTopology: true,useNewUrlParser: true })
// .then((result)=>{
//     app.listen(3000);
// }).catch(err=> 
//     console.log(err)) 
    



