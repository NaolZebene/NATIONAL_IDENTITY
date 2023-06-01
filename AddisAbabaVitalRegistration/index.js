const express = require("express");
const ejs  = require("ejs");
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const session = require("express-session");

mongoose.connect("mongodb://127.0.0.1/AddisAbabaRegistration", { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
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

//router
const subSectorRouter = require("./router/subSectorRouter"); 
const employeeRouter = require("./router/employeeRouter")
const authRouter = require("./router/authRouter");

app.use("", subSectorRouter);
app.use("", employeeRouter);
app.use("", authRouter);


app.get("/", function(req, res){
    res.json({
        msg:"Welcome to Addis Ababa Registration Sector Portal"
    })
})


app.listen(9000,()=>{
    console.log("Listening on port 9000")
})                                         
