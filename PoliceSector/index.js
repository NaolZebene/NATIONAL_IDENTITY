const express = require("express");
const ejs  = require("ejs");
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const session = require("express-session")
mongoose.connect("mongodb://127.0.0.1/PoliceSector", { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Database Connected Successfully");
})

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
app.use(express.urlencoded({extended:true}));
app.use(express.json())

//routers
const crimeRouter = require("./router/CrimeRouter")
const weaponRouter = require("./router/WeaponRouter");
const weaponOwnership = require("./router/weaponOwnerShip");
const employeeRouter = require("./router/employeeRouter")
const subSectorRouter = require("./router/SubsectorRouter");
const authController = require("./router/authRouter");

app.use("", crimeRouter)
app.use("", weaponRouter)
app.use("", weaponOwnership)
app.use("",employeeRouter)
app.use("",subSectorRouter);
app.use("",authController);


app.get("/", function(req, res){
    res.json({
        msg:"Welcome to Police Sector Portal"
    })
})


app.listen(5000,()=>{
    console.log("Listening on port 5000")
})