
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

function updateJson(){
    let data=fs.readFileSync(styleguidePath+'/package.json');
    let packageJson = JSON.parse(data);
    packageJson.scripts={
        "prestart": "rimraf app/",
        "start": "node tasks/watch.js",
        "build": "npm run build:css && npm run build:html && npm run build:img && npm run build:js && npm run build:static",
        "build:css": "node tasks/css.build.js",
        "build:html": "node tasks/html.build.js",
        "build:img": "node tasks/image.build.js",
        "build:js": "node tasks/javascript.build.js",
        "build:static": "node tasks/static.build.js",
        "test": "npm run test:css && npm run test:js && npm run test:markdown",
        "test:css": "stylelint -q ./src/**/*.scss",
        "test:js": "eslint --quiet ./src/**/*.js ./tasks/**/*.build.js",
        "test:markdown": "remark -q . ./src/**/*.md",
        "preversion": "npm test && rimraf dist/",
        "version": "cross-env NODE_ENV=production npm run build && git add -A dist",
        "version:patch": "node tasks/version.js patch && git add -u",
        "version:minor": "node tasks/version.js minor && git add -u",
        "version:major": "node tasks/version.js major && git add -u",
        "dist-patch": "npm run version:patch | npm version patch -m \"Upgrade assets to %s\"",
        "dist-minor": "npm run version:minor | npm version minor -m \"Upgrade assets to %s\"",
        "dist-major": "npm run version:major | npm version major -m \"Upgrade assets to %s\""
    };
    packageJson.devDependencies={
        "app-root-path": "2.0.1",
        "babel-core": "6.26.0",
        "babel-plugin-external-helpers": "6.22.0",
        "babel-preset-env": "1.6.1",
        "browser-sync": "2.19.0",
        "cattleman": "2.0.2",
        "chalk": "2.3.0",
        "cross-env": "5.1.3",
        "eslint": "4.14.0",
        "eslint-config-airbnb-base": "12.1.0",
        "eslint-plugin-import": "2.8.0",
        "imagemin": "5.3.1",
        "marked": "0.3.16",
        "node-notifier": "5.2.1",
        "node-sass": "4.7.2",
        "node-sass-tilde-importer": "1.0.1",
        "node-watch": "0.5.6",
        "primer-markdown": "3.7.5",
        "pug": "2.0.0-rc.4",
        "pug-dependency": "1.0.1",
        "remark-cli": "4.0.0",
        "remark-preset-lint-recommended": "3.0.1",
        "rimraf": "2.6.2",
        "rollup": "0.49.2",
        "rollup-plugin-babel": "3.0.3",
        "rollup-plugin-commonjs": "8.2.6",
        "rollup-plugin-node-resolve": "3.0.0",
        "rollup-plugin-uglify": "2.0.1",
        "semver": "5.5.0",
        "shelljs": "0.7.8",
        "stylelint": "8.4.0",
        "stylelint-order": "0.8.0",
        "stylelint-scss": "2.2.0",
        "uglify-es": "3.3.0"
    };
    packageJson.dependencies={
        "cookieconsent": "3.0.4",
        "highlight.js": "9.12.0",
        "normalize.css": "7.0.0"
    };
    fs.writeFile(styleguidePath+'/package.json', JSON.stringify(packageJson));
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
