const { spawn } = require('child_process');

const path = require("path")

// Path to the Python script
const pythonScriptPath = path.join(__dirname, 'crimerate.py');
const crimeTypeScript = path.join(__dirname, 'crimetype.py')

// Path to the .pkl file
const modelPklPath = path.join(__dirname, './crime_rate.pkl');
const crimetypePath = path.join(__dirname, './crime_type.pkl');


module.exports.crimeRate = async function(req, res){

const pythonProcess = spawn('python', [pythonScriptPath, modelPklPath]);
  pythonProcess.stdout.on('data', (data) => {

    const predictions = JSON.parse(data);
    const prediction = JSON.stringify(predictions)
    res.render("Stat/stat", {name:"City Name", predictions})
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


module.exports.crimeType = async function(req, res){

  const pythonProcess2 = spawn('python', [crimeTypeScript, crimetypePath]);
  pythonProcess2.stdout.on('data', (data) => {
    const predictions = JSON.parse(data);
    const prediction = JSON.stringify(predictions)
    res.render("Stat/stat", {name:"Crime Type", predictions })
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


