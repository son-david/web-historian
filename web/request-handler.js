var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

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
    if (req.url === "/www.google.com"){
      res.end('/google/');
    } else if (req.url === '/') {
      res.end('/<input/');
    } else {
      res.writeHead(404);
      res.end();
    }
  },
  'POST': function(req, res) {
    var data = "";
    req.on('data', function(chunk){
      data += chunk;
    });

    req.on('end', function(){
      fs.appendFile(path.join(__dirname, '../test/testdata/sites.txt'), data.slice(4) + '\n');
      res.writeHead(302);
      res.end();
    });
  },
  'OPTIONS': function(req, res) {
    res.end();
  }
}
