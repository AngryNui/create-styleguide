
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

//to-do recursive copying
fs.copySync('./create-styleguide/packages/styleguide-template/template/src/index.pug',styleguidePath +'/src/index.pug');
console.log(chalk.green('copied template'))
