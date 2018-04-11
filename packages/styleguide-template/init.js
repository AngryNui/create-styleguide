
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

let data=fs.readFileSync('package.json');
let packageJson = JSON.parse(data);
let styleguideName = packageJson.name;
let styleguidePath = './'+styleguideName;

fs.copy('./create-styleguide/packages/styleguide-template/template/src',styleguidePath +'/src', function (err) {
    if (err) {
        console.error(chalk.red(err));
    } else {
        console.log("copied template!");
    }
});
//todo move this to createStyleguide after fixing the arguments problem
//move package.json into styleguide
fs.renameSync('./package.json', styleguidePath+'/package.json');