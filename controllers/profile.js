let router = require("express").Router();

router.get("/personal-info", (req, res, next)=>{
    return res.render("personal-info");
});
router.get('/my-orders/:id', (req, res, next)=>{
    res.render("my-orders-detailed");
})
router.get("/my-orders", (req, res, next)=>{
    res.render("my-orders");
});
router.get("/addresses", (req ,res ,next)=>{
    res.render('my-addresses');
})
module.exports = router;