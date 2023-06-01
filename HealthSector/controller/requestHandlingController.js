const Request = require('../model/Requests');
const LaboratorySamples = require("../model/LaboratorySamples")

module.exports.editRequestByDoctorRender = async(req, res)=>{
    const {id} = req.params;
    const data = await Request.findById(id);
    const labData = await LaboratorySamples.findById(data.labResult);
    console.log(data, labData)
    return res.render("requestHandler/requestDoctor", {data, labData});
}
module.exports.editRequestByDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, description, medicine_ordered_as, disease_name } = req.body;

    // Find the request by ID
    const request = await Request.findById(id);

    if (!request) {
      return res.render('error', { message: 'Request not found' });
    }

    // Update the fields with the provided values
    request.status = status;
    request.description = description;
    request.medicineOrdered = medicine_ordered_as;
    request.diseaseName = disease_name;

    // Save the updated request
    await request.save();

    res.redirect(`/requests/${id}`);
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

module.exports.ctscanResultRender = async(req, res)=>{
    const {id} = req.params;
    return res.render("requestHandler/ctscanResult", {id})
}


module.exports.ctScanView = async(req, res) => {
  const data = await Request.find({status:"toctscan"});
  console.log(data)
  return res.render("requestHandler/ctScanView", {data});
}
module.exports.ctscanResult = async (req, res) => {
  try {
    const { description } = req.body;
    const { id } = req.params;
    const ctscan_image = req.file.path; // Assuming req.file contains the uploaded file and the path property represents the file path

    // Find the request by ID and update the CT scan field
    const request = await Request.findByIdAndUpdate(
      id,
      {
        Ct_scan: {
          data: {
            img_path: ctscan_image,
            description: description,
          },
        },
      },
      { new: true }
    );

    if (!request) {
      return res.render('error', { message: 'Request not found' });
    }

    res.redirect('/requests');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};


module.exports.ultraSoundView = async(req, res) => {
  const data = await Request.find({status:"toultrasound"});
  return res.render("requestHandler/ultrasoundView", {data});
}

module.exports.ultraSoundRender = async (req,res) => {
    const {id} = req.params;
    return res.render("requestHandler/ultraSound", {id});
}

module.exports.ultraSound = async (req, res) => {
  try {
    const { description } = req.body;
    const { id } = req.params;
    const ultraSound_image = req.file.path; // Assuming req.file contains the uploaded UltraSound image

    // Find the request by ID and update the ultrasound field
    const request = await Request.findByIdAndUpdate(
      id,
      {
        ultraSound: {
          data: {
            img_path: ultraSound_image,
            description: description,
          },
        },
      },
      { new: true }
    );

    if (!request) {
      return res.render('error', { message: 'Request not found' });
    }

    res.redirect('/requests');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};



module.exports.xrayView = async(req, res) => {
  const data = await Request.find({status:"toxray"});
  return res.render("requestHandler/xrayView", {data});
}

module.exports.x_rayRender = async (req,res) => {
    const {id} = req.params;
    return res.render("requestHandler/x-ray", {id});
}
module.exports.x_ray = async (req, res) => {
  try {
    const { description } = req.body;
    const { id } = req.params;
    const x_ray_image = req.file.path; // Assuming req.file contains the uploaded X-ray image

    // Find the request by ID and update the x-ray field
    const request = await Request.findByIdAndUpdate(
      id,
      {
        x_ray: {
          data: {
            img_path: x_ray_image,
            description: description,
          },
        },
        status:"todoctor"
      },
      { new: true }
    );

    if (!request) {
      return res.render('error', { message: 'Request not found' });
    }

    res.redirect('/requests');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};