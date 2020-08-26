let router = require('express').Router();
let Product = require('../models/product');
let loadPrefs = require('./admin-utils').loadPrefs;
router.get('/', async (req, res, next)=>{
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
    return res.render('shop', {slideGroups: slideGroups});
})
router.get('/قوانین و مقررات', )
module.exports = router;