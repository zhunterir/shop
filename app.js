const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const user = require('./controllers/user.js');
const admin = require('./controllers/admin.js');
const mainRouter = require('./controllers/main.js');
const profileRouter = require("./controllers/profile.js");
const isAdmin = require('./middleware/isAuthAdmin');
const session = require('express-session');
const flash = require('connect-flash');
var app = express();
let csurf = require('csurf');
let mongoDBStore = require('connect-mongodb-session')(session);
let sessionStore = new mongoDBStore({
    uri: "mongodb://localhost/shopDB",
    collection:'sessions' 
});
let csrfProtection = csurf();
mongoose.set('useFindAndModify', false);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret:'sdfwehwgqfq2f', resave:false, saveUninitialized:false, store: sessionStore}));
app.use(csrfProtection);
app.use(flash());
app.set('view engine' , 'ejs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next)=>{
    res.locals.isAuth = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});
app.use('/user' , user);
app.use('/admin', admin);
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



