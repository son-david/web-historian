var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.handleRequest = function (req, res) {
  var action = actions[req.method];

  if (action) {
    action(req, res);
  } else {
    // 404
    res.writeHead(404);
    res.end();
  }
};





var actions = {
  'GET': function(req, res) {
    console.log('GET');
    if (req.url === '/'){
      fs.createReadStream(path.join(__dirname, '../index.html')).pipe(res);
    } else if (req.url === "/www.google.com") {
      res.end('/google/');
    } else {
      res.writeHead(404);
      res.end();
    }
  },
  'POST': function(req, res) {
    console.log('POST');

    var data = "";
    req.on('data', function(chunk){
      data += chunk;
    });

    req.on('end', function(){
      var present = false;
      archive.isUrlInList(data, function(val) {
        if (val === 1) {
          console.log('exists');
          res.writeHead(200);
          fs.createReadStream(path.join(__dirname, '../archives/sites/' + data)).pipe(res);
        } else {
          console.log('does not exist');
          // archive.addUrlToList(data);
          // archive.downloadUrls([data]);
          fs.appendFile(path.join(__dirname, '../archives/queue.txt'), data+"\n");
          res.writeHead(200);
          fs.createReadStream(path.join(__dirname, '../loading.html')).pipe(res);
        }
      });


      // fs.appendFile(path.join(__dirname, '../test/testdata/sites.txt'), data.slice(4) + '\n');
    });
  },
  'OPTIONS': function(req, res) {
    console.log('OPTIONS');
    res.writeHead(200, headers);
    res.end();
  }
}

// exports.readListOfUrls = function(callback) {

// exports.isUrlInList = function(url, callback) {

// exports.addUrlToList = function(url, callback) {

// exports.isUrlArchived = function(url, callback) {

// exports.downloadUrls = function(urls) {
