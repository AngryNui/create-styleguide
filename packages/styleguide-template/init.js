
'use strict';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');

var styleguideName;
var styleguidePath;

function install(appName){
    styleguideName = appName;
    styleguidePath = './'+styleguideName;
    updateJson();
    copyTemplate();
};
// todo fix json assigns
function updateJson(){
    let styleguideJson = require(path.dirname(module.id)+'/package.json');
    let packageJson = require(path.resolve(styleguidePath+'/package.json'));
    if (!packageJson.dependencies) packageJson.dependencies={};
    if (!packageJson.devDependencies) packageJson.devDependencies={};
    if (!packageJson.scripts) packageJson.scripts={};
    packageJson.dependencies = Object.assign(packageJson.dependencies,styleguideJson.dependencies);
    packageJson.devDependencies = Object.assign(packageJson.devDependencies,styleguideJson.devDependencies);
    //packageJson.devDependencies = Object.assign(packageJson.scripts,styleguideJson.scripts);
    fs.writeFile(styleguidePath+'/package.json', JSON.stringify(packageJson, null, 2));
};

function copyTemplate(){
    try {
        fs.mkdirSync(path.resolve(styleguidePath+"/tasks"))
    } catch (err) {
        console.log(chalk.red(dirPath +'already excists'));
        if (err.code !== 'EEXIST') throw err
    }
    fs.copy('./create-styleguide/packages/styleguide-template/template/src',styleguidePath +'/src', function (err) {
        if (err) {
            console.error(chalk.red(err));
        } else {
            console.log(chalk.green("copied template!"));
        }
    });
    fs.copy('./create-styleguide/packages/styleguide-template/tasks',styleguidePath +'/tasks', function (err) {
        if (err) {
            console.error(chalk.red(err));
        } else {
            console.log(chalk.green("copied tasks!"));
        }
    });
};

module.exports = {
    install: install
};
