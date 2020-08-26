const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bycrypt = require("bcrypt");
const Joi = require("joi");
const user = require('./controllers/user.js');
const admin = require('./controllers/admin.js');
const mainRouter = require('./controllers/main.js');
const profileRouter = require("./controllers/profile.js");
let session = require('express-session');
var app = express();
let mongoDBStore = require('connect-mongodb-session')(session);
let sessionStore = new mongoDBStore({
    uri: "mongodb://localhost/shopDB",
    collection:'sessions'
    ,expires: 60
    
});

mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine' , 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(session({secret:'sdfwehwgqfq2f', resave:false, saveUninitialized:false, store: sessionStore}));
app.use('/user' , user);
app.use('/admin' , admin);
app.use("/profile", profileRouter);
app.use('/', mainRouter );
mongoose.connect("mongodb://localhost/shopDB",{ useUnifiedTopology: true,useNewUrlParser: true })
.then((result)=>{
    console.log('connected');
    app.listen(2000);
}).catch(err=>{
    console.log('error'); 
    console.log(err); 
})



