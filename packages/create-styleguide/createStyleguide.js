'use strict';

const fs = require('fs')
const path = require('path')
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
let appPath = "./"+styleguideName;

if (!styleguideName){
    console.log(chalk.red('projectname is missing :('));
    console.log(chalk.green(''));
    console.log(chalk.green('Try:'));
    console.log(chalk.green('create-styleguide my-awesome-styleguide'));
    process.exit(1);
}

console.log(chalk.green('// ToDo: create styleguide :D'));
console.log(chalk.green('create ./' + styleguideName));

// creating folders
mkdirSync(path.resolve('./'+styleguideName));
mkdirSync(path.resolve(appPath+"/app"));
mkdirSync(path.resolve(appPath+"/src"));
mkdirSync(path.resolve(appPath+"/node_modules"));
