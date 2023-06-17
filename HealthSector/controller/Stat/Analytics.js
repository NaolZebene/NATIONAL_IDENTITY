const Transaction = require("../../model/Transactions"); 


module.exports.TotalIncome = async function(req, res){
    const place = req.session.user.sector_id;
    const datas = Transaction.find({sector_id:place});

    let total = 0;
    console.log(datas)
}