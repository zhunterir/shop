const express = require('express');
const bodyParser = require('body-parser');
const path  = require('path');
const mongoose= require('mongoose');
const fs = require('fs');
const usersController = require('./controllers/users');
const adminController = require('./controllers/admin');
let jsonParser = bodyParser.json();
let urlencoded =  bodyParser.urlencoded({extended:false});
const app= express();
app.set('view engine', 'ejs');
app.use(jsonParser);
app.use(urlencoded);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminController);
app.use('/users', usersController);
app.use('/', (req, res, next)=>{
    res.send('Home page');
})
mongoose.connect("mongodb://localhost/nodjs",{ useUnifiedTopology: true,useNewUrlParser: true })
.then((result)=>{
    app.listen(3000);
}).catch(err=> 
    console.log(err)) 
    
    



