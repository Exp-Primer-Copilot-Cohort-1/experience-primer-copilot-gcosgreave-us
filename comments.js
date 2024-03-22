// create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// create web server
http.createServer(function(request, response){
  var path = url.parse(request.url).pathname;
  console.log(path);
  // if request is GET
  if (request.method == 'GET') {
    if (path == '/comments') {
      // read comments file
      fs.readFile('comments.json', function(err, data){
        if (err) {
          response.writeHead(500, {'Content-Type':'text/plain'});
          response.end('Internal Server Error');
          return;
        }
        response.writeHead(200, {'Content-Type':'text/plain'});
        response.end(data);
      });
    } else {
      response.writeHead(404, {'Content-Type':'text/plain'});
      response.end('Not Found');
    }
  // if request is POST
  } else if (request.method == 'POST') {
    if (path == '/comments') {
      var body = '';
      request.on('data', function(data){
        body += data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        // read comments file
        fs.readFile('comments.json', function(err, data){
          if (err) {
            response.writeHead(500, {'Content-Type':'text/plain'});
            response.end('Internal Server Error');
            return;
          }
          var comments = JSON.parse(data);
          comments.push(post);
          // write comments file
          fs.writeFile('comments.json', JSON.stringify(comments), function(err){
            if (err) {
              response.writeHead(500, {'Content-Type':'text/plain'});
              response.end('Internal Server Error');
              return;
            }
            response.writeHead(200, {'Content-Type':'text/plain'});
            response.end('OK');
          });
        });
      });
    } else {
      response.writeHead(404, {'Content-Type':'text/plain'});
      response.end('Not Found');
    }
  } else {
    response.writeHead(405, {'Content-Type':'text/plain'});
    response.end('Method Not Allowed');
  }
}).listen(8080);
console.log('Server running at http://');