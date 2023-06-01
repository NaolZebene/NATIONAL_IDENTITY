const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs")
const app = express();
const path = require("path")
const session = require("express-session")
const {checkUser} = require('./utils/seed')
const ejsMate = require("ejs-mate")


mongoose.connect("mongodb://127.0.0.1/HealthSector", {useUnifiedTopology:true, useNewUrlParser:true}).then(()=>{
    console.log("Connected to Database")
}).catch((e)=>{
    console.log("error while connecting to database")
})

checkUser()
  .then(() => {
    console.log("User Exists");
  })
  .catch((err) => {
    console.log(err);
  });


app.engine("ejs", ejsMate)
app.set("view engine", 'ejs');
app.set("/views",path.join(__dirname,"views"))

app.use(session({
  secret: 'your-secret-key', // Replace with your secret key
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set it to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000 // Session expiration time (in milliseconds)
  }
}));

app.use(express.static(path.join(__dirname, "public")))

app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.get("/dashboard", function(req, res){
  res.render("index")
})

//Routes
const subsectorAuth = require("./router/subsectorAuthRouter")
const employeeRouter = require("./router/EmployeeRouter");
const requestRouter = require("./router/RequestRouter");
const referralRouter = require("./router/ReferralRouter");
const drugRouter = require("./router/drugRouter")
const subSector = require("./router/subSectorRouter");
const AuthRouter = require("./router/AuthRouter");
const requestHandler = require("./router/requestHandingRouter");
const labRouter = require("./router/laboratorySampleRouter");
const transactionRouter = require("./router/transactionRouter");
const exp = require("constants");

app.use("", subsectorAuth);
app.use("", requestHandler);
app.use("", employeeRouter);
app.use("", requestRouter);
app.use("",referralRouter);
app.use("",drugRouter);
app.use("", subSector);
app.use("", AuthRouter);
app.use("", labRouter)
app.use("", transactionRouter);


app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})