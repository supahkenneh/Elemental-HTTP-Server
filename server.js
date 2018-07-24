const http = require('http');
const get = require('./getRequest');
const post = require('./postRequest');
const put = require('./putRequest');
const del = require('./delRequest');
const port = process.env.port || 3005;

const server = http.createServer((request, response) => {
  console.log('Incoming request');
  let method = request.method;
  let url = request.url;
  switch(method) {
    case 'GET':
    get.getReq(url, response);
    break;
    case 'POST':
    post.postReq(request, response);
    break;
    case 'PUT':
    put.putReq(request, response);
    break;
    case 'DELETE':
    del.delReq(request, response);
    break;
    default:
    response.writeHead(405, { 'Error' : 'Method not allowed' });
    response.end();
    break;
  }
})

server.on('end', () => {
  console.log('Connection terminated');
})

server.listen(port, () => {
  console.log('Connected to server');
})

