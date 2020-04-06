const isLoggedIn = (req,res,next)=>{

    // if userInfo does not have a value, i.e. not logged in, redirect to login.
    if (req.session.userInfo) {
        next();
    }
    else {
        res.redirect("/user/login");
    }
}

module.exports = isLoggedIn;