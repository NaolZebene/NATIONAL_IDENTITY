const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs")
const app = express();
const path = require("path")
const session = require("express-session")
const {checkUser} = require('./utils/seed')
const ejsMate = require("ejs-mate")
const {isLoggedIn} = require("./utils/isLoggedIn")
const {authorize} = require("./utils/Authorization")
const cors = require("cors")
const Transaction = require("./model/Transactions")
const Drug = require("./model/Drugs")
const Referral = require("./model/Referals")
const Employees = require("./model/Employees")
const Requests = require("./model/Requests");

app.use(cors({ origin: '*' }));


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

app.use(function (req, res, next) {
  // res.locals.success = req.flash("success");
  // res.locals.error = req.flash("error");
  res.locals.currentUser = req.session.user;
  // res.locals.carts = req.session.carts;
  next();
});

app.get("/dashboard",isLoggedIn,authorize(["admin", "centralAdmin"]), async function(req, res){
  const place = req.session.user.sector_id; 
  const all = await Transaction.find({sector_id: place})
  total = 0
  all.forEach((data)=>{
    total = total + Number(data.Amount);
  })

  const all_drugs = await Drug.find({sector_id:place})
  let all_drug_total = 0;

  all_drugs.forEach((data)=>{
    all_drug_total = all_drug_total + Number(data.amount);
  })

  const referrals = await Referral.find({hospitalId:place, status:'active'})
  const active_referrals = referrals.length;
  console.log(active_referrals)
  const all_emp = await Employees.find({sector_id : place});
  const total_emp = all_emp.length;

  const currentYear = new Date().getFullYear();

  const datas = await Requests.find({sector_id : place});
   let all_services = {}
  for(d of datas){
    const full_year = new Date(d.date).getFullYear();
    const month = new Date(d.date).getMonth() + 1;
    // console.log(new Date(d.date))
    if(full_year == currentYear){
      if(!all_services[month]){
        all_services[month] = 1
      }else{
        all_services[month]++;
      }
    }
  }

  all_services = JSON.stringify(all_services)
  res.render("index", {total_income:total, all_drug_total, active_referrals, total_emp,all_services, all_emp})
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
const diseaseStat = require("./router/statRouter");

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
app.use("", diseaseStat);


app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})