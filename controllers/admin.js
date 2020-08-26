const express = require('express');
const bodyParser = require("body-parser");
const bycrypt = require("bcrypt")
const mongoose = require("mongoose");
const {Admin , validateSignup , validateSignin  , validateUpdate} = require('../models/admin.js');
const fs = require('fs');
const pageLimit = 10;
const gregorian_to_jalali = require("./converter").gregorian_to_jalali;
const OrderItem = require("../models/orderItem");
const jalaali = require('jalaali-js')
const uniqid = require('uniqid');
const router =  express.Router();
const path = require('path');
const formidable = require('formidable');
const Product = require('../models/product');
const Joi = require('@hapi/joi');
const Order = require("../models/order");
const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
const getObjectSize =require('./admin-utils').getObjectSize;
const getStrTime = require('./admin-utils').getStrTime;
const loadPrefs= require('./admin-utils').loadPrefs;
const addProductValidator = (body, rest)=>{
    for (let field in rest){
      if (!(typeof(field)== typeof('h') && field.length<999)){
      }
      else{
        return new Joi.ValidationError('error in rest')
      }
    }
  body.sale= +body.sale;
  let schema = Joi.object({
    title: Joi.string().max(1000).required(),
    category : Joi.string().max(150),
    price:  Joi.number().max(9999999999).required(),
    count: Joi.number().max(9999999).required().allow(Infinity),
    sale :Joi.number().max(99999999999),
    about: Joi.string().allow(''),
    captcha: Joi.equal(''),
    colors: Joi.array(),
    callOrderOnly: Joi.string().max(3),
    sellPermit: Joi.string().max(3)
  });
  return schema.validate(body);
}
async function addOrUpdateProduct(req,res, productID){
  let form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      let product =null;
      let {title, category, price ,count, sale, about,captcha,colors, callOrderOnly, sellPermit,infCount, ...rest} =fields;
      colors = JSON.parse(colors);
      count = infCount? Infinity: +count;
      console.log(fields);
      let {error}=addProductValidator({title, category, price, count, sale, about, captcha, colors, callOrderOnly, sellPermit} ,rest);
      if (!error){
        if (productID){
          product= await Product.findOne({id: productID});
          product.title = title, product.category= category, product.price =price, product.count= count,
          product.sale= (sale?+sale: 0), product.about= about, product.colors = colors, product.callOrderOnly =callOrderOnly, 
          product.sellPermit = sellPermit;
          product.moreInfo = [];
        }
        else{
          let uniq=uniqid.process();
          product= new Product({id:uniq, title: title, category: category
            ,price: +price, count: count, sale: (sale?+sale:0), about: about, colors: colors,
             callOrderOnly: callOrderOnly, sellPermit:sellPermit });
        }
        let size = getObjectSize(rest);
        for (let i=0; i<size; i++){
          product.moreInfo.push({title: rest['infoTitle'+i], value: rest['infoValue'+i]});
        }
        if (files.picture.size !==0){
          if (validImageTypes.includes(files.picture.type)){
            oldPath = files.picture.path;
            let uniq=uniqid.process();
            let fileName= uniq +'.'+files.picture.type.split('/')[1];
            let newPath = path.join(__dirname,'..','public','product-images', fileName);
            fs.rename(oldPath, newPath, async function (err) {
              if (err){
                console.log(err);
                return res.redirect('/admin/add-product?error=مجددا تلاش کنید');
              }
              console.log(newPath);
              if (productID!==undefined && product.imgUrl!==''){
                fs.rmdir(path.join(__dirname, '..','public',product.imgUrl),(err)=>{
                  console.log(err);
                });
              }
              product.imgUrl= '/product-images/'+fileName;
              await product.save();
              console.log('saved');
              return res.redirect('/admin')
            });
          }
          else{
            console.log('invalid picture type');
            return res.redirect('/admin/add-product?error=فرمت عکس نامعتبر است.');
          }
        }
        else{
          await product.save();
          return res.redirect('/admin')
        }
      }
      else{
        console.log(error);
        return res.redirect('/admin?error=مجددا تلاش کنید')
        
      }
    });
    
  }
  //////////////////////////////////////////
router.get('/add-product', (req, res , next)=>{
  let categories = loadPrefs().categories;
  return res.render('add-product',{'categories': categories,error: '',path:'add-product'});
})
router.post('/add-product', (req, res, next)=>{
  return addOrUpdateProduct(req, res, undefined);
});
router.get('/products/card/:productID', (req, res, next)=>{
  let productID = req.params.productID;
  
  Product.findOne({id: productID},(err,doc)=>{
    if (err || !doc){
      return res.sendStatus(404).send('<p>product with ID:'+req.params.productID+' not found</p>');
    }
    console.log(doc);
    let product = doc.toObject();
    console.log('product:', product);
    product.creationStr = getStrTime(product["creationDate"]);
    return res.send(JSON.stringify(product));
  })
});

router.post('/products/edit', async (req, res, next)=>{
  return await addOrUpdateProduct(req,res, req.query.id);
});

router.get('/products/edit/:productID', (req, res, next)=>{
  let categories = loadPrefs().categories;
  Product.findOne({id: req.params.productID},(err, doc)=>{
    if (err){
      return res.sendStatus(404).send('<p>product with ID:'+req.params.productID+' not found</p>');
    }
    doc.colorsStr = JSON.stringify(doc.colors);
    console.log(doc.colors);
    return res.render('admin-edit-product',{categories: categories, path:'',action:'edit', product: doc, error:''})
  })
});

router.get('/products/search',(req, res, next)=>{
  console.log('search req');
  let title = req.query.title;
  // let category = req.query.category;
  let query=Product.find({},{title:1, id:1, _id:-1})
  if (title){
    console.log('title:',title);
    query.where('title').regex(`.*${title}.*`);
    // if (category){
    //   query.where('category').equals(category);
    // }
    query.exec((err, results)=>{
      if(err){
        console.log(err);
        return res.json([]);
      }
      return res.json(results);
    });
  }
  else{
    return res.json([]);
  }
});
router.get("/orders", async (req, res, next)=>{
  let options ={};
  let orders = [];
  let jalDate = '';
  if (!req.query.page){
    orders = await Order.find().sort({orderDate:-1}).limit(pageLimit+1).exec();
    options.page = '1';
  }
  else{
    options.page = req.query.page;
    orders = await Order.find().sort({orderDate:-1}).limit(pageLimit+1).skip((+req.query.page - 1) * pageLimit).exec(); 

  }
  console.log('after',orders);
  if (! orders[10]){
    options.isLastPage = true;
  }
  else{
    console.log('orders1000000000000000',orders[10]);
    orders.splice(10, 1);
  }
  console.log(orders);
  for (let order of orders){
    jalDate = jalaali.toJalaali(order.orderDate.getFullYear(), order.orderDate.getMonth() + 1,order.orderDate.getDate());
    order.orderDateStr = jalDate.jy +'/' + jalDate.jm + '/' + jalDate.jd ;
  }
  res.render("admin-orders", {categories: loadPrefs().categories, orders:orders,path:'orders', options})
});

router.post("/orders/changeToPending", async(req, res, next)=>{
  let {error} = Joi.object({orderNo: Joi.string().max(7)}).validate(req.body);
  if (!error){
    let order= await Order.findOne().where('orderNo').equals(+req.body.orderNo).exec();
    order.deliveryStat = 'pending';
    order.deliveryDate = new Date();
    await order.save()
    return res.redirect('/admin/orders/'+req.body.orderNo);
  }
  else{
    res.sendStatus(403);    
  }
})
router.post('/orders/changeToCancelled', async (req, res, next)=>{
  let order = await Order.findOne().where('orderNo').equals(+req.body.orderNo);
  order.deliveryStat = 'cancelled';
  order.deliveryDate = new Date();
  await order.save();
  res.redirect("/admin/orders/"+req.body.orderNo);
})
router.post("/orders/changeToDelivered",async  (req ,res ,next)=>{
  console.log('req body: ',req.body);
  let scheme = Joi.object({
    orderNo: Joi.string().max(7).required(),
    date: Joi.string().regex(/^\d{4}\/\d{1,2}\/\d{1,2}$/) 
  })
  let {error} = scheme.validate(req.body);
  if (! error){
    let order = await Order.findOne().where('orderNo').equals(req.body.orderNo).exec();
    let parts= req.body.date.split('/');
    console.log('parts', parts);
    let date  = new Date();
    let gdate=jalaali.toGregorian(+parts[0],+parts[1], +parts[2]);
    date.setDate(gdate.gd);
    date.setMonth(gdate.gm -1);
    date.setFullYear(gdate.gy);
    order.deliveryDate = date;
    order.deliveryStat = "delivered";
    await order.save();
    console.log('saved');
    return res.redirect('/admin/orders/'+req.body.orderNo);
  }
  else{
    console.log(error);
    return res.sendStatus(403);
  }
})
router.get("/orders/:id",async (req, res ,next)=>{
  let order = await Order.findOne({orderNo: req.params.id});
  let jalDate = jalaali.toJalaali(order.orderDate.getFullYear(), order.orderDate.getMonth() + 1,order.orderDate.getDate());
  order.orderDateStr = jalDate.jy +'/' + jalDate.jm + '/' + jalDate.jd ;
  jalDate = jalaali.toJalaali(order.deliveryDate.getFullYear(), order.deliveryDate.getMonth()+1, order.deliveryDate.getDate());
  order.deliveryDateStr = jalDate.jy +'/' + jalDate.jm + '/' + jalDate.jd;
  console.log(order.deliveryDateStr);
  res.render("admin-order-detail", {order: order, categories: loadPrefs().categories});
});
// router.post('/products/change-categories', (req,res,next)=>{
//   let categories = loadPrefs().categories;
//   let category = req.body.category;
//   if (typeof(category)==typeof('asf')){
//     fs.readFile(path.join(__dirname,'..','files','other','preferences.json'),(err,data)=>{
//       if (err) {
//         console.log(err);
//         return res.render('admin-products',
//         {categories: categories, path:'products', succeed:null, error:'دوباره تلاش کنید'})
//       }
//       let preferneces={};
//       preferneces =JSON.parse(data);
//       fs.writeFile(path.join(__dirname,'..','files','other','preferences.json'),JSON.stringify(preferneces)
//       ,(err)=>{
//         if (err){
//           console.log(err);
//           return res.render('admin-products', 
//           {categories: categories, path:'products', succeed:null, error:'دوباره تلاش کنید'});
//         }
//         categories.push(category);
//         return res.sendStatus(200).render('admin-products',
//         {categories: categories, path:'products', succeed:'دسته بندی جدید اضافه شد', error:null} )
//       })
//     })
//   }
// });
router.get('/products/:productID', (req, res, next)=>{
  let categories=  loadPrefs().categories;
  Product.findOne({id: req.params.productID},(err, doc)=>{
    if (err){
      return res.sendStatus(404);
    }
    doc.colorsStr = JSON.stringify(doc.colors);
    return res.render('admin-edit-product',{categories: categories, path:'', action:'view', product: doc, error:''})
  })
});
router.post("/products/delete", async (req, res, next)=>{
  let result = await Product.deleteOne({id: req.body.id});
  if (res)
    return res.redirect('/admin/products?message=delete_ok');
  else 
    return res.redirect('/admin/products?message=delete_error');
});
router.get('/products', (req, res ,next)=>{
  let categories = loadPrefs().categories;
  let query= Product.find().limit(100).sort('title').select('title price sale id count');
  let options = {categories:categories, path: 'products', message: req.query.message,succeed:null, error:null};
  if ( req.query.category){
    query.where('category').equals(req.query.category);
    options['listCategory']= req.query.category;
  }
  else{
    options['listCategory']= '';
  }
  query.exec((err, results)=>{
    if (err){
      console.log(err);
      return res.sendStatus(404);
    }
    options['products']= results;
    res.render('admin-products',options);
  })
});

router.get('/signin-fake', (req, res, next)=>{
  res.render("signin-fake");
});

router.post('/login-fake', (req, res, next)=>{
  req.session.isAdmin = true;
  res.redirect('/admin');
});

router.get('/', (req, res, next)=>{
  let categories = loadPrefs().categories;
  res.render('admin-main', {categories:categories, path: ''}); 
});


router.get('/signup' , (req , res)=>{
    res.render('sign_up_admin');
});

router.get('/signin' , (req , res)=>{
    res.render('sign_in_admin');
});

router.get('/update' , (req , res)=>{
    res.render('update_admin');
});
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
});



router.post('/login' , async(req , res)=>{
    var {error} = validateSignin(req.body);
    if (error) return res.status(400).render('result' , { result : error.details[0].message.replace(/['"]+/g, '')});
    
    var admin = await Admin.findOne({username : req.body.username});
    if(!admin) return res.status(404).render('result' , { result : "User with this number did not find....!"});

    var validatePass = await bycrypt.compare(req.body.password , admin.password);
    if(!validatePass) return res.status(401).render('result' , { result : "Invalid password.....!"});

    return res.status(200).render('result' , { result : "You log in successfuly"});
    
});
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

});
router.get('/delete/:id' , async(req,res)=>{
    var admin = await Admin.findByIdAndRemove(req.params.id);
    if(!admin) return res.status(404).render('result' , { result : "User with this Id did not find....!"});
    return res.status(200).render('result' , { result : "User deleted successfuly.....!"});

});

module.exports = router;
