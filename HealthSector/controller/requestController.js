const Request = require('../model/Requests');

// Render the create form
exports.renderCreateForm = (req, res) => {
  res.render('Requests/create-request');
};

// Create a new request
exports.createRequest = async (req, res) => {
  try {
    const { idNumber } = req.body;
    const request = new Request({ idNumber });
    await request.save();
    console.log("create", request)
    res.redirect('/requests');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Render the update form for a specific request
exports.renderUpdateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findById(id);
    console.log(request)
    if (!request) {
      return res.render('error', { message: 'Request not found' });
    }
    res.render('Requests/update-request', { request });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Update a specific request
exports.updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { idNumber } = req.body;
    const request = await Request.findById(id);
    if (!request) {
      return res.render('error', { message: 'Request not found' });
    }
    request.idNumber = idNumber;
    await request.save();
    res.redirect('/requests');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Delete a specific request
exports.deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await Request.findByIdAndRemove(id);
    res.redirect('/requests');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// View details of a specific request
exports.viewDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findById(id)
      .populate('doctorInformation', 'name email')
      .populate('personalInformation', 'name address')
      .populate('labResult');

    if (!request) {
      return res.render('error', { message: 'Request not found' });
    }
    console.log (request)
    res.render('Requests/view-details', { request });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// View all requests
exports.viewAll = async (req, res) => {
  try {
    const requests = await Request.find();
    res.render('Requests/view-requests', { requests });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};
