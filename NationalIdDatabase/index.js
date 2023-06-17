const express = require("express");
const ejs  = require("ejs");
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const session = require("express-session");
const {seedF, seedSuperAdmin} = require("./util/seedData")
const cors = require("cors")

const ejsMate = require("ejs-mate")
const {isLoggedIn} = require("./util/isLoggedin")

app.use(cors({ origin: '*' })); 

mongoose.connect("mongodb://127.0.0.1/Residents", { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Database Connected Successfully");
})


seedF().then(()=>{
    console.log("database seeded")
}).catch((e)=>{
    console.log("Error while seeding",e)
})

seedSuperAdmin().then(()=>{
    console.log("super admin seeded")
}).catch((e)=>{
    console.log("Error while seeding the database" , e); 
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
        secure: false,
        maxAge: 3600000, 
      },
    })
);
app.use(express.urlencoded({extended:true}));
app.use(express.json())


app.use(function (req, res, next) {
    res.locals.currentUser = req.session.userId;
    next();
  });

app.engine("ejs", ejsMate)
app.set("view engine", 'ejs');
app.set("/views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname, "public")))

//router
const residentRouter = require("./router/residentRouter");
const authRouter = require("./router/authRouter")


app.use("", residentRouter);
app.use("", authRouter)


app.get("/",isLoggedIn, function(req, res){
    return res.render("index")
})


app.listen(8000,()=>{
    console.log("Listening on port 8000")
}) 