const Flow = require("../model/flow");
const Users = require("../model/Users")
const bcrypt = require("bcrypt"); 
const SALT = 10 

module.exports.seedF = async function(){
    const flow = await Flow.find();
    if(!flow.length){
        const f = new Flow({_id:0,currentIdx:0});
        await f.save();
    }
}



module.exports.seedSuperAdmin = async function(){
    const users = await Users.find();

    if(!users.length){
        const default_pass = "123456"
        const hashedpassword = await bcrypt.hash(default_pass, SALT)
        const new_SUPER = new Users({
          fullname:"Admin", 
          email:"admin@gmail.com",
          password:hashedpassword,
          role:"superAdmin"
        })
        await new_SUPER.save();
    }
}