'use strict';

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { exec } = require('child_process');
const styleguideTemplate = require('../styleguide-template/init');

const mkdirSync = function (dirPath) {
    try {
        fs.mkdirSync(dirPath)
    } catch (err) {
        console.log(chalk.red(dirPath +'already excists'));
        if (err.code !== 'EEXIST') throw err
    }
}

let styleguideName = process.argv[2];
if (!styleguideName){
    console.log(chalk.red('projectname is missing :('));
    console.log(chalk.green(''));
    console.log(chalk.green('Try:'));
    console.log(chalk.green('create-styleguide my-awesome-styleguide'));
    process.exit(1);
}
module.exports.appName = styleguideName;

let styleguidePath = "./"+styleguideName;
let packageJson ={};
packageJson.name=styleguideName;
packageJson.version="0.0.1";
packageJson.private=true;
packageJson.dependencies={};

console.log(chalk.green('create ./' + styleguideName));

// creating folders
mkdirSync(path.resolve('./'+styleguideName));
mkdirSync(path.resolve(styleguidePath+"/app"));
mkdirSync(path.resolve(styleguidePath+"/src"));
mkdirSync(path.resolve(styleguidePath+"/node_modules"));

//writing initial package.json
fs.writeFileSync(styleguidePath+'/package.json', JSON.stringify(packageJson));

//install template
styleguideTemplate.install(styleguideName);


//npm install
console.log(chalk.green("npm install..."));
exec('cd ./my-awesome-styleguide && npm install', (error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    if (error) {
        console.error(chalk.red(`exec error: ${error}`));
        return;
    } else {
        console.error(chalk.green('type cd '+styleguideName+' and "npm start" and have fun :)'))
    }
});



