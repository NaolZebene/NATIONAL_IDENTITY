const LaboratorySample = require('../model/LaboratorySamples');
const Request = require("../model/Requests")

// Render the create form
exports.renderCreateForm = (req, res) => {
  const {id} = req.params;
  res.render('LaboratorySample/create-laboratorySample', {id });
  
};


exports.createLaboratorySample = async (req, res) => {
  try {
    const { cardNumber, processName, testResult, referenceValue, dataConducted, diagnosisSummary, status} = req.body;
    const {id} = req.params;

    const laboratorySample = new LaboratorySample({
      cardNumber,
      processName,
      testResult,
      referenceValue,
      dataConducted,
      diagnosisSummary, 
      status:"todoctor"
    });

    const request = await Request.findById(id);
    if(!request){
      return res.render("error", {message:"No such Requests"});
    }
    // console.log(request)
    request.labResult = laboratorySample._id;
    await laboratorySample.save();
    await request.save();
    const data = await Request.findById(id);
    // console.log(data)
    res.redirect('/requests');

  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Render the update form for a specific laboratory sample
exports.renderUpdateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const laboratorySample = await LaboratorySample.findById(id);

    if (!laboratorySample) {
      return res.render('error', { message: 'Laboratory Sample not found' });
    }

    res.render('LaboratorySample/update-laboratorySample', { laboratorySample });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Update a specific laboratory sample
exports.updateLaboratorySample = async (req, res) => {
  try {
    const { id } = req.params;
    const { cardNumber, processName, testResult, referenceValue, dataConducted, diagnosisSummary } = req.body;

    const laboratorySample = await LaboratorySample.findById(id);

    if (!laboratorySample) {
      return res.render('error', { message: 'Laboratory Sample not found' });
    }

    laboratorySample.cardNumber = cardNumber;
    laboratorySample.processName = processName;
    laboratorySample.testResult = testResult;
    laboratorySample.referenceValue = referenceValue;
    laboratorySample.dataConducted = dataConducted;
    laboratorySample.diagnosisSummary = diagnosisSummary;

    await laboratorySample.save();
    res.redirect('/laboratorySamples');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Delete a specific laboratory sample
exports.deleteLaboratorySample = async (req, res) => {
  try {
    const { id } = req.params;
    await LaboratorySample.findByIdAndRemove(id);
    res.redirect('/laboratorySamples');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// View details of a specific laboratory sample
exports.viewDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const laboratorySample = await LaboratorySample.findById(id);

    if (!laboratorySample) {
      return res.render('error', { message: 'Laboratory Sample not found' });
    }

    res.render('LaboratorySample/view-details', { laboratorySample });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// View all laboratory samples
exports.viewAllLaboratorySamples = async (req, res) => {
  try {
    const laboratorySamples = await Request.find({"status" : "tolab"});
    res.render('LaboratorySample/view-all-laboratory-samples', { laboratorySamples });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};
