const isIC = (req,res,next)=>{

    // if userInfo does not have a value, i.e. not logged in, redirect to login.
    if (req.session.userInfo != null && req.session.userInfo.type=="IC") {
        next();
    }
    else {
        res.redirect("/");
    }
}

module.exports = isIC;
