//check if node_modules folder exists, and if not run npm install
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const nodeModulesExists = fs.existsSync(path.join(__dirname, '/node_modules'));

if (!nodeModulesExists) {
  console.log('node_modules folder does not exist for cypress/server-test, npm install in progress...');
  exec('npm install', {}, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(stdout);
    console.log(stderr);
  });
}