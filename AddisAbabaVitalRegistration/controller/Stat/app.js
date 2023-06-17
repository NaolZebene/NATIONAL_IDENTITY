const { spawn } = require('child_process');
const path = require("path")

// Path to the Python script
const pythonScriptPath = path.join(__dirname, 'model_loader.py');
const growthScriptPath = path.join(__dirname, 'growth.py')
// Path to the .pkl file
const modelPklPath = path.join(__dirname, './population.pkl'); // Replace with the path to your .pkl file


// Execute the Python script and capture the predictions




module.exports.Prediction = async function(req, res){
  const pythonProcess = spawn('python', [pythonScriptPath, modelPklPath]);




  pythonProcess.stdout.on('data', (data) => {
    const predictions = JSON.parse(data);
    res.json({
      "msg":JSON.stringify(predictions)
    })
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




module.exports.growthPrediction = async function(req, res){

  const pythonProcess2 = spawn("python", [growthScriptPath, modelPklPath])

  pythonProcess2.stdout.on('data', (data) => {
    const predictions = JSON.parse(data);
    const prediction = JSON.stringify(predictions)
    res.render("Stat/stat", {predictions,prediction})
  });
  
  
  pythonProcess2.stderr.on('data', (data) => {
    console.error(`Error executing Python script: ${data}`);
  });
  
  pythonProcess2.on('close', (code) => {
    if (code !== 0) {
      console.error(`Python script process exited with code ${code}`);
    }
  });
}


