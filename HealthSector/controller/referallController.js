const Referral = require('../model/Referals');
const Request = require("../model/Requests")

// Render the create form
exports.renderCreateForm = (req, res) => {
  res.render('Referral/create-referral');
};

// Create a new referral
exports.createReferral = async (req, res) => {
  try {
    const { referralType, weaknesses, currentCase, location,idin ,idNumber, idNum, emergencyCode} = req.body;
    console.log(req.body)
    const referral = new Referral({
      hospitalName:idNumber,
      referralType,
      weaknesses,
      currentCase,
      location, 
      hospitalId:idin,
      from:req.session.user._id, 
      idNumber: idNum, 
      emergencyCode
    });

    await referral.save();
    res.redirect('/referrals');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Render the update form for a specific referral
exports.renderUpdateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const referral = await Referral.findById(id)
      .populate('personalInformation', 'name address')
      .exec();

    if (!referral) {
      return res.render('error', { message: 'Referral not found' });
    }

    res.render('Referral/update-referral', { referral });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Update a specific referral
exports.updateReferral = async (req, res) => {
  try {
    const { id } = req.params;
    const { referralType, weaknesses, currentCase, location, hospitalName } = req.body;

    const referral = await Referral.findById(id);

    if (!referral) {
      return res.render('error', { message: 'Referral not found' });
    }

    referral.referralType = referralType;
    referral.weaknesses = weaknesses;
    referral.currentCase = currentCase;
    referral.location = location;
    referral.hospitalName = hospitalName;

    await referral.save();
    res.redirect('/referrals');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Delete a specific referral
exports.deleteReferral = async (req, res) => {
  try {
    const { id } = req.params;
    await Referral.findByIdAndRemove(id);
    res.redirect('/referrals');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// View details of a specific referral
exports.viewDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const referral = await Referral.findById(id)
      .populate('personalInformation', 'name address')
      .exec();

    if (!referral) {
      return res.render('error', { message: 'Referral not found' });
    }

    res.render('Referral/view-details', { referral });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// View all referrals
exports.viewAllReferrals = async (req, res) => {
  try {
    const referrals = await Referral.find({hospitalId : req.session.user.sector_id})
      // .populate('personalInformation', 'name address')
      // .exec();
    
    res.render('Referral/view-referrals', { referrals });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

module.exports.EscalateToDoctors = async function(req, res){
  const {id} = req.params;
  
  const referral = await Referral.findById(id);
  if(!referral){
    return res.render("error", {message:"No such Id"});
  }


  referral.status = "pending";
  const newRequest = new Request({
    idNumber:referral.idNumber || emergencyCode,
    priority:1
  })

  await newRequest.save();
  await referral.save()
}
