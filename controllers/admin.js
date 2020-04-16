

const fs = require('fs');
const uniqid = require('uniqid');
const express= require('express');
const router =  express.Router();
const path = require('path');
const Product = require('../models/product');
const formidable = require('formidable');
const Joi = require('@hapi/joi');
const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
let categories =[]
try{
  let buffer =fs.readFileSync(path.join(__dirname, '..','files','other','preferences.json'));
  categories = JSON.parse(buffer).categories;
}
catch(e) {
  console.log(e);
  process.exit()
} 

const addProductValidator = (body)=>{
  body.price = +body.price;
  if (body.sale===''){
    body.sale= 0;
  }
  else{
    body.sale = +body.sale;
  }
  body.count = +body.count;
  let schema = Joi.object({
    title: Joi.string().max(200).required(),
    category : Joi.string().max(150),
    price:  Joi.number().max(99999999).required(),
    count: Joi.number().max(9999999).required(),
    sale :Joi.number().max(99999999),
    about: Joi.string().allow(''),
    captcha: Joi.equal(''),
  });
  return schema.validate(body);
}

//////////////////////////////////////////
router.get('/add-product', (req, res , next)=>{
    res.render('./admin/add-product',{'categories': categories ,message:''});
})

router.get('/add-product/error', (req,res,next)=>{
  res.render('/admin/add-product', {categories:categories, message:"error"});
})
router.get('/add-product/added', (req,res,next)=>{
  res.render('../admin/add-product.ejs', {categories:categories, message:"added"})
})
router.post('/add-product', (req, res, next)=>{
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      let {values, error}=addProductValidator(fields);

      if (!error){
        console.log(files.picture);
        if (files.picture.size !==0){
          if (validImageTypes.includes(files.picture.type)){
            oldPath = files.picture.path;
            let uniq=uniqid.process();
            let newPath = path.join(__dirname,'..','public','product-images', uniq+'.'+files.picture.type.split('/')[1]);
            fs.rename(oldPath, newPath, function (err) {
              if (err){
                console.log(err);
                return res.redirect('/admin/add-product/error');
              }
              let newProduct= new Product({id:uniq, title: fields.title, imgUrl: newPath, category: fields.category
              ,price: fields.price, count: fields.count, sale: fields.sale, about: fields.about })
              newProduct.save();
              return res.redirect('/admin/add-product/added')
            });
          }
          else{
            console.log('invalid picture type');
            return res.redirect('/admin/add-product/error');
          }
        }
        else{
          let uniq=uniqid.process();
          let newProduct= new Product({id:uniq, title: fields.title, category: fields.category
          ,price: fields.price, count: fields.count, sale: fields.sale, about: fields.about })
          newProduct.save();
          return res.redirect('/admin/add-product/added')
        }
      }
    });
});

router.get('/', (req, res, next)=>{
  console.log('admin');
  
  res.render('admin/admin-main', {categories:categories, path: ''});
})
module.exports = router;


