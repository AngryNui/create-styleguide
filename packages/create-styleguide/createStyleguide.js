'use strict';

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

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

let appPath = "./"+styleguideName;
let packageJson ={};
packageJson.name=styleguideName;
packageJson.version="0.0.1";
packageJson.private=true;
packageJson.dependencies={};
packageJson.dependencies.awesomestuff="^1.1.6";

//writing initial package.json
fs.writeFileSync('package.json', JSON.stringify(packageJson));

console.log(chalk.green('create ./' + styleguideName));

// creating folders
mkdirSync(path.resolve('./'+styleguideName));
mkdirSync(path.resolve(appPath+"/app"));
mkdirSync(path.resolve(appPath+"/src"));
mkdirSync(path.resolve(appPath+"/node_modules"));

//dependencies which need the package.json
const styleguideTemplate = require('../styleguide-template/init');

