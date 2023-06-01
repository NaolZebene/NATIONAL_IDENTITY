const Drug = require('../model/Drugs');

// Render the create form
exports.renderCreateForm = (req, res) => {
  res.render('Drug/create-drug');
};

// Create a new drug
exports.createDrug = async (req, res) => {
  try {
    const { Drug_name, amount } = req.body;

    const drugExist = await Drug.findOne({Drug_name:Drug_name , sector_id:req.session.user.sector_id});
    if(!drugExist){
    const drug = new Drug({
      Drug_name,
      amount, 
      sector_id:req.session.user.sector_id
    });

    await drug.save();
    res.redirect('/drugs');
  }
  else{
    drugExist.amount = Number(drugExist.amount) + Number(amount);
    await drugExist.save();
    res.redirect('/drugs');
  }
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Render the update form for a specific drug
exports.renderUpdateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const drug = await Drug.findById(id);

    if (!drug) {
      return res.render('error', { message: 'Drug not found' });
    }

    res.render('Drug/update-drug', { drug });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Update a specific drug
exports.updateDrug = async (req, res) => {
  try {
    const { id } = req.params;
    const { Drug_name, amount } = req.body;

    const drug = await Drug.findById(id);

    if (!drug) {
      return res.render('error', { message: 'Drug not found' });
    }

    drug.Drug_name = Drug_name;
    drug.amount = amount;

    await drug.save();
    res.redirect('/drugs');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Delete a specific drug
exports.deleteDrug = async (req, res) => {
  try {
    const { id } = req.params;
    await Drug.findByIdAndRemove(id);
    res.redirect('/drugs');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// View details of a specific drug
exports.viewDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const drug = await Drug.findById(id);

    if (!drug) {
      return res.render('error', { message: 'Drug not found' });
    }

    res.render('Drug/view-drug-details', { drug });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// View all drugs
exports.viewAllDrugs = async (req, res) => {
  try {
    const drugs = await Drug.find({sector_id:req.session.user.sector_id});
    res.render('Drug/view-all-drugs', { drugs });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};
