const generateDB = (req,res,next)=>{

    // if userInfo does not have a value, i.e. not logged in, redirect to login.
    if (req.session.userInfo.type=="IC") {
        res.render("user/inventorydashboard")
    }
    else {
        res.render("user/dashboard");
    }
}

module.exports = generateDB;