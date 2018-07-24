const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const port = process.env.port || 3005;
const public = "./public";
const existingFiles = [];

const server = http.createServer((request, response) => {
  console.log('Incoming request');
  let method = request.method;
  let url = request.url;
  console.log(url);
  let version = request.httpVersion;
  //if request method is GET...
  switch(method) {
    case 'GET':
    getReq(url, response);
  }
})

server.on('end', () => {
  console.log('Connection terminated');
})

server.listen(port, () => {
  console.log('Connected to server');
})

/***** HELPER FUNCTIONS *****/
function getReq(fileURL, response) {
  if (fileURL === '/') {
    fs.readFile(`${public}index.html`, (err, data) => {
      response.write(data.toString().trim());
      response.end(() => {
        console.log('Request fulfilled');
      });
    })
  } else {
    response.writeHead(200, { 'Content-Type': `text/plain` });
    fs.readFile(`${public}${fileURL}`, (err, data) => {
      if (err) {
        fs.readFile(`${public}/404.html`, (err, data) => {
          response.write(data.toString().trim());
          response.end(() => {
            console.log('File not found');
          })
        })
      } else {
        response.write(data.toString().trim());
        response.end(() => {
          console.log('Request fulfilled');
        });
      }
    })
  }
}