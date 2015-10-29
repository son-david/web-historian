var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(callback) {
  fs.readFile(path.join(__dirname, "../archives/sites.txt"), function(err, data){
    if(err){console.log(err)}
    callback(data.toString().split('\n')); 
  });
};

exports.isUrlInList = function(url, callback) {
  var urlTable = {};
  // console.log(url + "yes")
  exports.readListOfUrls(function(urls) {
    urls.forEach(function(site) {
      // console.log(site);
      // console.log(urlTable[site]);
      urlTable[site] = 1;
    });
    callback(urlTable[url]);
  });
};

exports.addUrlToList = function(url, callback) {
   fs.appendFile(path.join(__dirname, '../archives/sites.txt'), url+"\n");
   if (callback) callback();
};

exports.isUrlArchived = function(url, callback) {
  fs.stat(path.join(__dirname, "../archives/sites/"+url), function(err, stats){
    if (err) {
      callback(stats)
    } else {
      callback(stats.isFile());
    }
  });
};

exports.downloadUrls = function(urls) {
  // path.join(__dirname, "../archives/sites/" + site), 
  urls.forEach(function(site){
    request.get('http://' + site).pipe(fs.createWriteStream(path.join(__dirname, "../archives/sites/" + site)));
    // request.get({
    //   url: 'http://' + site,
    //   progress: function (current, total) {
    //     console.log('downloaded %d bytes from %d', current, total);
    //   }
    // }, function (err, res) {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   console.log(res.code, "yes", res.headers,"yesyes", res.buffer.toString());
    // });
    // fs.writeFile(path.join(__dirname, "../archives/sites/"+site), function(err, data){
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     request.get({
    //       url: 'http://' + site,
    //       progress: function (current, total) {
    //         console.log('downloaded %d bytes from %d', current, total);
    //       }
    //     }, path.join(__dirname, "../archives/sites/" + site), function (err, res) {
    //       if (err) {
    //         console.error(err);
    //         return;
    //       }
    //       console.log(res.code, res.headers, res.file);
    //     });

        // fs.appendFile(path.join(__dirname, "../test/testdata/sites.txt", site + '\n'));
      
  });
};
