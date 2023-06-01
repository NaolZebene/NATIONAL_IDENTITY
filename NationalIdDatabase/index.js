const express = require("express");
const ejs  = require("ejs");
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const session = require("express-session");

mongoose.connect("mongodb://127.0.0.1/Residents", { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
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
        secure: false,
        maxAge: 3600000, 
      },
    })
);
app.use(express.urlencoded({extended:true}));
app.use(express.json())

//router
const residentRouter = require("./router/residentRouter");


app.use("", residentRouter);


app.get("/", function(req, res){
    res.json({
        msg:"Welcome to National Id Sector Portal"
    })
})


app.listen(8000,()=>{
    console.log("Listening on port 8000")
}) 