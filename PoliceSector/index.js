const express = require("express");
const ejs  = require("ejs");
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const session = require("express-session")
const ejsMate = require("ejs-mate")
const {checkUser} = require("./utils/seed")
const {isLoggedIn} = require("./utils/isLoggedIn")
mongoose.connect("mongodb://127.0.0.1/PoliceSector", { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Database Connected Successfully");
})

checkUser().then(()=>{
  console.log("User Exists");
}).catch((e)=>{
  console.log("Error while creating super admin")
  console.log(e);
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

//routers
const crimeRouter = require("./router/CrimeRouter")
const weaponRouter = require("./router/WeaponRouter");
const weaponOwnership = require("./router/weaponOwnerShip");
const employeeRouter = require("./router/employeeRouter")
const subSectorRouter = require("./router/SubsectorRouter");
const authController = require("./router/authRouter");
const statRouter = require("./router/statRouter")

app.use("", crimeRouter)
app.use("", weaponRouter)
app.use("", weaponOwnership)
app.use("",employeeRouter)
app.use("",subSectorRouter);
app.use("",authController);
app.use("", statRouter);

app.get("/",isLoggedIn, function(req, res){
  return res.render("index");
})


app.listen(5000,()=>{
    console.log("Listening on port 5000")
})