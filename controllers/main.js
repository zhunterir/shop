let router = require('express').Router();
let Product = require('../models/product');
let loadPrefs = require('./admin-utils').loadPrefs;
let colors = {
    blue:'آبی',
    red: 'قرمز',
    green: 'سبز',
    purple: 'بنفش',
    yellow: 'زرد',
    black: 'مشکی',
    orange: 'نارنجی',
    toosi: 'نوک مدادی',
}
router.get('/product/:prodID', async(req, res, next)=>{
    let prod = await Product.findOne({id:req.params.prodID});
    if (prod){
        return res.render("product", {prod: prod ,colorMap: colors});
    }
    else{
        return res.sendStatus(404);
    }
});
router.get('/', async (req, res, next)=>{
    let options = {};
    if (req.flash('openTab')[0]=='signup'){
        options.openTab = 'signup';   
    }
    let slideshowPref = loadPrefs().slideshows;
    let slideGroups = []
    for (let groupData of slideshowPref){
        let slideGroup = {title: groupData.title, prods:[]};
        for (let prodID of groupData.prods){
            let prod =  await Product.findOne({id: prodID});
            if (prod)
                slideGroup.prods.push(prod);
        }
        if (slideGroup.prods.length )
            slideGroups.push(slideGroup);
    }
    console.log(slideGroups);
    options.slideGroups = slideGroups
    return res.render('shop', options);
})
router.get('/قوانین و مقررات', )
module.exports = router;