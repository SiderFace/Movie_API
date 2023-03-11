const http = require('http');
const url = require('url');

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello Node!\n');
}).listen(8080);

console.log('My first Node test server is running on Port 8080.');

// let addr = 'http://localhost:8080/default.html?year=2017&month=february';
// let q = url.parse(addr, true);

// console.log(q.host); 
// console.log(q.pathname);
// console.log(q.search); 

// let qdata = q.query; 
// console.log(qdata.month); 