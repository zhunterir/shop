module.exports = (req, res, next)=>{
    if (! req.session.isLoggedIn){
        return res.redirect('/admin/login')
    }
    else{
        return next();
    }
}