if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require('ejs-mate');
const methodOverride = require("method-override");
const expressError = require("./utils/expressError.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy =  require("passport-local");
const User = require("./models/user.js");

// let MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
let dburl = process.env.ATLASDB_URL;

//Routers
const users = require("./routes/user.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");


app.engine('ejs', ejsMate);
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));

const store = MongoStore.create({
    mongoUrl: dburl,
    touchAfter: 24 * 3600, // time period in seconds
});

store.on("error", ()=>{
    console.log("Error is Mongo Session store", err);
});

const sessionOptions = {
    store,
    "secret": process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    // expire date is after 7days in ms
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true,

    }
};

app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

//listing routes 
app.use("/listings", listings);
//review routes
app.use("/listings/:id/reviews", reviews);
//user routes
app.use("/", users);


// app.get("/", (req,res)=>{
//     res.send("Server is working!");
// });


//According to New version 
app.use((req,res,next)=>{
    next(new expressError(404,"Page not found!"));

});


//Error Middleware
app.use((err,req,res,next)=>{
    console.log(err);
    let {statusCode=500, message="Something is wrong!"} = err;
    res.status(statusCode).render("error.ejs",{message});
});


main().then(()=>{
    console.log("DB is Connected!");
}).catch((err)=>{
    console.log(err);
});


async function main() {
    await mongoose.connect(dburl);
    
}

app.listen(8080,()=>{
    console.log("Server is listening at port 8080");
});