const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const Joi = require("joi");
const pug = require('pug');
const router = express.Router();
const {Admin , validateSignup , validateSignin  , validateUpdate} = require('../model/admin.js');




router.get('/signup' , (req , res)=>{
    res.render('sign_up_admin');
})

router.get('/signin' , (req , res)=>{
    res.render('sign_in_admin');
})

router.get('/update' , (req , res)=>{
    res.render('update_admin');
})

router.post('/register' , async (req , res)=>{
    var {error} = validateSignup(req.body);
    if (error) return res.status(400).render('result' , { result : error.details[0].message.replace(/['"]+/g, '')});

    var salt  =  await bycrypt.genSalt(10);
    req.body.password = await bycrypt.hash(req.body.password , salt);

    var admin = new Admin({
        username : req.body.username,
        password : req.body.password,
        email : req.body.email
    });

    await admin.save();
    return res.status(200).render('result' , { result : `You registered successfuly with this phone : ${req.body.username}`});
})



router.post('/login' , async(req , res)=>{
    var {error} = validateSignin(req.body);
    if (error) return res.status(400).render('result' , { result : error.details[0].message.replace(/['"]+/g, '')});
    
    var admin = await Admin.findOne({username : req.body.username});
    if(!admin) return res.status(404).render('result' , { result : "User with this number did not find....!"});

    var validatePass = await bycrypt.compare(req.body.password , admin.password);
    if(!validatePass) return res.status(401).render('result' , { result : "Invalid password.....!"});

    return res.status(200).render('result' , { result : "You log in successfuly"});
    
})


router.post('/update' , async(req , res)=>{
    var {error} = validateUpdate(req.body);
    if (error) return res.status(400).render('result' , { result : error.details[0].message.replace(/['"]+/g, '')});

    var salt  =  await bycrypt.genSalt(10);
    req.body.password = await bycrypt.hash(req.body.password , salt);

    if(req.body.username != ''){
        var admin = await Admin.findByIdAndUpdate(req.body.id , {
            username : req.body.username
        } , {new : true})
    }

    if(req.body.password != ''){
        var admin = await Admin.findByIdAndUpdate(req.body.id , {
            password : req.body.password
        } , {new : true})

    }

    if(req.body.email != ''){
        var admin = await Admin.findByIdAndUpdate(req.body.id , {
            email : req.body.email
        } , {new : true})

    }
 
    if(req.body.username != '' || req.body.password != ''|| req.body.email != ''){
        res.status(200).render('result' , {result : "The Update was successfully...!"});
    }

})

router.get('/delete/:id' , async(req,res)=>{
    var admin = await Admin.findByIdAndRemove(req.params.id);
    if(!admin) return res.status(404).render('result' , { result : "User with this Id did not find....!"});

    return res.status(200).render('result' , { result : "User deleted successfuly.....!"});
})


module.exports = router;
















//////////////////////////////////////////////////mohammad
// const fs = require('fs');
// const uniqid = require('uniqid');
// const express= require('express');
// const router =  express.Router();
// const path = require('path');
// const Product = require('../models/product');
// const formidable = require('formidable');
// const Joi = require('@hapi/joi');
// const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
// let categories =[]
// try{
//   let buffer =fs.readFileSync(path.join(__dirname, '..','files','other','preferences.json'));
//   categories = JSON.parse(buffer).categories;
// }
// catch(e) {
//   console.log(e);
//   process.exit()
// } 

// const addProductValidator = (body)=>{
//   body.price = +body.price;
//   if (body.sale===''){
//     body.sale= 0;
//   }
//   else{
//     body.sale = +body.sale;
//   }
//   body.count = +body.count;
//   let schema = Joi.object({
//     title: Joi.string().max(200).required(),
//     category : Joi.string().max(150),
//     price:  Joi.number().max(99999999).required(),
//     count: Joi.number().max(9999999).required(),
//     sale :Joi.number().max(99999999),
//     about: Joi.string().allow(''),
//     captcha: Joi.equal(''),
//   });
//   return schema.validate(body);
// }

// //////////////////////////////////////////
// router.get('/add-product', (req, res , next)=>{
//     res.render('./admin/add-product',{'categories': categories ,message:''});
// })

// router.get('/add-product/error', (req,res,next)=>{
//   res.render('/admin/add-product', {categories:categories, message:"error"});
// })
// router.get('/add-product/added', (req,res,next)=>{
//   res.render('../admin/add-product.ejs', {categories:categories, message:"added"})
// })
// router.post('/add-product', (req, res, next)=>{
//     let form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//       let {values, error}=addProductValidator(fields);

//       if (!error){
//         console.log(files.picture);
//         if (files.picture.size !==0){
//           if (validImageTypes.includes(files.picture.type)){
//             oldPath = files.picture.path;
//             let uniq=uniqid.process();
//             let newPath = path.join(__dirname,'..','public','product-images', uniq+'.'+files.picture.type.split('/')[1]);
//             fs.rename(oldPath, newPath, function (err) {
//               if (err){
//                 console.log(err);
//                 return res.redirect('/admin/add-product/error');
//               }
//               let newProduct= new Product({id:uniq, title: fields.title, imgUrl: newPath, category: fields.category
//               ,price: fields.price, count: fields.count, sale: fields.sale, about: fields.about })
//               newProduct.save();
//               return res.redirect('/admin/add-product/added')
//             });
//           }
//           else{
//             console.log('invalid picture type');
//             return res.redirect('/admin/add-product/error');
//           }
//         }
//         else{
//           let uniq=uniqid.process();
//           let newProduct= new Product({id:uniq, title: fields.title, category: fields.category
//           ,price: fields.price, count: fields.count, sale: fields.sale, about: fields.about })
//           newProduct.save();
//           return res.redirect('/admin/add-product/added')
//         }
//       }
//     });
// });

// router.get('/', (req, res, next)=>{
//   console.log('admin');
  
//   res.render('admin/admin-main', {categories:categories, path: ''});
// })
// module.exports = router;


