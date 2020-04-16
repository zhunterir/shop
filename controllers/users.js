const express = require('express');
const joi =  require('joi');
const router =express.Router();
function validateRegister(body){
    const schema = joi.object({
        phone : joi.string().min(11).max.required(),
        password: joi.string().min(8).max(15).required(),
        repassword: joi.ref('password')
    });
    return joi.validate(body, schema);
}
router.get('/register', (req, res, next)=>{
    res.render('sign_up');
})

router.post('/register', (req, res, next)=>{
    console.log(req.body);
    validateRegister(req.body).catch(err=>{
        console.log(err);
    });
    res.redirect('/');
    
})

module.exports = router
