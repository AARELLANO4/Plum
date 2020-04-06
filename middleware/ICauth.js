const isIC = (req,res,next)=>{

    // if userInfo does not have a value, i.e. not logged in, redirect to login.
    if (req.session.userInfo.type=="IC") {
        next();
    }
    else {
        res.redirect("/user/login");
    }
}

module.exports = isIC;