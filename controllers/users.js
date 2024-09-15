const User=require('../models/user.js');


//get signup user
module.exports.getSignupUser=(req,res)=>{
    res.render("users/signup.ejs");
}

//post signup user
module.exports.postSignupUser=async(req,res,next)=>{
    try{
        let {username,email,password}=req.body;
        let user=new User({username,email});
        const registeredUser=await User.register(user,password);
        
        req.login(registeredUser,(error)=>{
            if(error){
                return next(error);
            }
            req.flash("success",`Welcome ${(username).toUpperCase()} the page of Listing`);
            return res.redirect("/listing")
        });
        
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }

}


//Get login user
module.exports.getLoginUser=(req,res)=>{
    res.render("users/login.ejs");
}

//Post login user
module.exports.postLoginUser=async(req,res)=>{
    req.flash("success",`Welcome ${(req.user.username).toUpperCase()} ,The page of Listing`);
    let redirectUrl=res.locals.redirectUrl || "/listing"
    res.redirect(redirectUrl);

}

//Logout user
module.exports.logoutUser=(req,res)=>{
    req.logout((error)=>{
        if(error){
            return next(error);
        }
        req.flash("success","logged you out!");
        res.redirect("/listing");
    })
}