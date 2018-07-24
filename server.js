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
  //if request method is GET...
  switch(method) {
    case 'GET':
    getReq(url, response);
    break;
    case 'POST':
    postReq(request, response);
    break;
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
};

function postReq (request, response) {

  request.on('data', (data) => {
    let parsedData = qs.parse(data.toString());
    let newFile = `${request.url.substring(1, request.url.length)}`
  
    let newDoc = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>The Elements - ${parsedData.name}</title>
      <link rel="stylesheet" href="/css/styles.css">
    </head>
    <body>
      <h1>${parsedData.name}</h1>
      <h2>${parsedData.atomicSymbol}</h2>
      <h3>Atomic number ${parsedData.atomicNum}</h3>
      <p>${parsedData.description}</p>
      <p><a href="/">back</a></p>
    </body>
    </html>`

    fs.writeFile(`${public}/${newFile}`, newDoc, (err) => {
      if (err) {
        console.log(err);
      } else {
        response.writeHead(200, { 'Content-Type': 'application/json', 'Content-Body': '{ "success" : true }'});
        response.end(() => {
          console.log('Write successful');
        })
      }
    })
  });
}

