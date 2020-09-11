const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const Joi = require("joi");
const router = express.Router();
const {User , validateSignup , validateSignin , validateUpdate} = require('../models/user.js');


router.post('/register' , async (req , res)=>{
    var {error} = validateSignup(req.body);
    // if (error) return res.status(400).render('result' , { result : error.details[0].message.replace(/['"]+/g, '')});
    if (error){
        return res.sendStatus(403);
    }
    if (req.body.password !== req.body.repassword){
        return res.sendStatus(403);
    }
    // check code 
    let user  = await User.findOne({mobile: req.body.mobile});
    if (user){
        req.flash('openTab', 'signup');
        req.flash('fname', req.body.fname);
        req.flash("lname", req.body.lname);
        return res.redirect('/')
    }
    var salt  =  await bycrypt.genSalt(10);
    req.body.password = await bycrypt.hash(req.body.password , salt);
    user = new User({
        phone : req.body.phone,
        password : req.body.password
    });

    await user.save();
    console.log(user); 
    return res.status(200).render('result' , { result : `You registered successfuly with this phone : ${req.body.phone}`});
})
router.post('/login' , async(req , res)=>{
    var {error} = validateSignin(req.body);
    if (error) return res.status(400).render('result' , { result : error.details[0].message.replace(/['"]+/g, '')});
    
    var user = await User.findOne({phone : req.body.phone});
    if(!user) return res.status(404).render('result' , { result : "User with this number did not find....!"});
    var validatePass = await bycrypt.compare(req.body.password , user.password);
    if(!validatePass) return res.status(401).render('result' , { result : "Invalid password.....!"});
    return res.status(200).render('result' , { result : "You log in successfuly"});
    
})



router.post('/update' , async(req , res)=>{
    console.log(req.body);
    var {error} = validateUpdate(req.body);
    if (error) return res.status(400).render('result' , { result : error.details[0].message.replace(/['"]+/g, '')});

    var salt  =  await bycrypt.genSalt(10);
    req.body.password = await bycrypt.hash(req.body.password , salt);

    if(req.body.phone != ''){
        console.log("this is phone...!");
        var user = await User.findByIdAndUpdate(req.body.id , {
            phone : req.body.phone
        } , {new : true})
    }

    if(req.body.password != ''){
        var user = await User.findByIdAndUpdate(req.body.id , {
            password : req.body.password
        } , {new : true})

    }

    if(req.body.firstName != ''){
        console.log("thi is firstname....!")
        var user = await User.findByIdAndUpdate(req.body.id , {
            firstName : req.body.firstName
        } , {new : true})

    }

    if(req.body.lastName != ''){
        var user = await User.findByIdAndUpdate(req.body.id , {
            lastName : req.body.lastName
        } , {new : true})

    }

    if(req.body.meliCode != ''){
        var user = await User.findByIdAndUpdate(req.body.id , {
            meliCode : req.body.meliCode
        } , {new : true})

    }

    if(req.body.address != ''){
        var user = await User.findByIdAndUpdate(req.body.id , {
            address : req.body.address
        } , {new : true})

    }

    if(req.body.postalCode != ''){
        var user = await User.findByIdAndUpdate(req.body.id , {
            postalCode : req.body.postalCode
        } , {new : true})
    }

    if(req.body.email != ''){
        var user = await User.findByIdAndUpdate(req.body.id , {
            email : req.body.email
        } , {new : true})
    }

    if(req.body.phone != '' || req.body.password != '' || req.body.firstName != '' || req.body.lastName != '' || req.body.postalCode != '' || req.body.meliCode != '' || req.body.address != '' || req.body.email != ''){
        res.status(200).render('result' , {result : "The Update was successfully...!"});
    }

})

router.delete('/delete/:id' , async(req,res)=>{
    var user = await User.findByIdAndRemove(req.params.id);
    if(!user) return res.status(404).render('result' , { result : "User with this Id did not find....!"});

    return res.status(200).render('result' , { result : "User deleted successfuly.....!"});
})


module.exports = router;




///////////////////////////////////////////////mohammad
// const express = require('express');
// const joi =  require('joi');
// const router =express.Router();
// function validateRegister(body){
//     const schema = joi.object({
//         phone : joi.string().min(11).max.required(),
//         password: joi.string().min(8).max(15).required(),
//         repassword: joi.ref('password')
//     });
//     return joi.validate(body, schema);
// }
// router.get('/register', (req, res, next)=>{
//     res.render('sign_up');
// })

// router.post('/register', (req, res, next)=>{
//     console.log(req.body);
//     validateRegister(req.body).catch(err=>{
//         console.log(err);
//     });
//     res.redirect('/');
    
// })

// module.exports = router
