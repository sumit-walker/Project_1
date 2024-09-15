if(process.env.NODE_ENV !="production"){
    require('dotenv').config()
}

const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const methodOverride=require("method-override");
const engine=require('ejs-mate');
const ExpressError=require("./util/ExpressError.js")
const session=require('express-session');
const MongoStore = require('connect-mongo');
const flash=require('connect-flash');
const passport=require('passport');
const localStrategy=require("passport-local");
const User=require('./models/user.js');


const MONGO_URL='mongodb://localhost:27017/wanderlust'
const dbUrl=process.env.ATLASDB_URL;


const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:23*3600,//It should be in seconds
});

store.on("error",()=>{
    console.log("Error in session store",err);
})

const sessionOption={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+ 7 * 24 * 60 * 60* 1000,
        httpOnly:true
    }
};




app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize())
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})



const listingRouter=require('./Routes/listing.js')
const reviewRouter=require('./Routes/review.js')
const userRouter=require('./Routes/users.js');

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"/public")))


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine('ejs',engine);




app.use('/listing',listingRouter)
app.use('/listing/:id/reviews',reviewRouter)
app.use('/',userRouter);


main().then((res)=>{
    console.log("connection successfull");
})
.catch((err)=>console.log("err".err));

async function main(){
    await mongoose.connect(dbUrl);
}



app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found!"));
})

app.use((req,res,next)=>{
    let {status,message}=err;
    app.render("error.ejs");
    // app.status(status).send(message);
})

app.listen(3000,()=>{
    console.log("Server is litening at port 3000");
})