const { spawn } = require('child_process');
const path = require("path")

// Path to the Python script
const pythonScriptPath = path.join(__dirname, 'disease_predction.py');


// Path to the .pkl file
const modelPklPath = path.join(__dirname, 'disease_prediction.pkl');




module.exports.getStatView = function(req, res){
  return res.render("Stat/stat")
}

module.exports.getDiseasePrediction = async function(req, res){
// console.log("here ")
const pythonProcess = spawn('python', [pythonScriptPath, modelPklPath]);
pythonProcess.stdout.on('data', (data) => {
    const predictions = JSON.parse(data);
    const prediction = JSON.stringify(predictions)
    // console.log(predictions)
    res.render("Stat/stat", {prediction, predictions})
  });

pythonProcess.stderr.on('data', (data) => {
  console.error(`Error executing Python script: ${data}`);
});

pythonProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Python script process exited with code ${code}`);
    }
  });
}






