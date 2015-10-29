#!/usr/local/bin/node

var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

var downloadUrls = require(path.join(__dirname, '../helpers/archive-helpers.js'));
downloadUrls.downloadUrls();
// console.log("hello world");
