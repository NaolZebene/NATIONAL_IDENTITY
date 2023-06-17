const express = require("express");
const ejs  = require("ejs");
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const session = require("express-session");
const ejsMate = require("ejs-mate")
const {isLoggedIn} = require("./util/isLoggedIn")
const {checkUser} = require("./util/seed")

mongoose.connect("mongodb://127.0.0.1/AddisAbabaRegistration", { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Database Connected Successfully");
})


checkUser().then(()=>{
    console.log("User exists")
}).catch((e)=>{
    console.log("error while creating super admin");
    console.log(e)
})

app.engine("ejs", ejsMate)
app.set("view engine", 'ejs');
app.set("/views",path.join(__dirname,"views"))

app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 3600000, // Session expiration time in milliseconds
      },
    })
);


app.use(express.static(path.join(__dirname, "public")))
app.use(function (req, res, next) {
    // res.locals.success = req.flash("success");
    // res.locals.error = req.flash("error");
    res.locals.currentUser = req.session.role;
    res.locals.user = req.session.user
    next();
  });

app.use(express.urlencoded({extended:true}));
app.use(express.json())

//router
const subSectorRouter = require("./router/subSectorRouter"); 
const employeeRouter = require("./router/employeeRouter")
const authRouter = require("./router/authRouter");
const statRouter = require("./router/statRouter")

app.use("", subSectorRouter);
app.use("", employeeRouter);
app.use("", authRouter);
app.use("", statRouter)



app.get("/",isLoggedIn, function(req, res){
   return res.render("index")
})


app.listen(9000,()=>{
    console.log("Listening on port 9000")
})                                         
