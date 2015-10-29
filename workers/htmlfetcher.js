#!/usr/local/bin/node

var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

fs.appendFile(path.join(__dirname, '/test.txt'), 'hello world' + '\n');

var downloadUrls = require(path.join(__dirname, '../helpers/archive-helpers.js'));
fs.appendFile(path.join(__dirname, '/test.txt'), downloadUrls.downloadUrls);
downloadUrls.downloadUrls();
// console.log("hello world");
