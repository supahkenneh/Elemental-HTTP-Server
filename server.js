const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const port = process.env.port || 3005;
const public = "./public";

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
  let numElements = 2;
  
  request.on('data', (data) => {
    let parsedData = qs.parse(data.toString());
    let newFile = `${request.url.substring(1, request.url.length)}`
    numElements++;
  
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

    let updatedIndex = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>The Elements</title>
      <link rel="stylesheet" href="/css/styles.css">
    </head>
    <body>
      <h1>The Elements</h1>
      <h2>These are all the known elements.</h2>
      <h3>These are ${numElements}</h3>
      <ol>
        <li>
          <a href="/hydrogen.html">Hydrogen</a>
        </li>
        <li>
          <a href="/helium.html">Helium</a>
        </li>
          ${generateLink(newFile, parsedData.name)}   
      </ol>
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

    fs.writeFile(`${public}/index.html`, updatedIndex, (err) => {
      if (err) {
        console.log(err);
      } else {
        response.writeHead(200, { 'Content-Type': 'application/json', 'Content-Body': '{ "success" : true }'});
        response.end(() => {
          console.log('Index Updated');
        })
      }
    })
  });
}

function generateLink(url, name) {
  return `<li>
<a href="/${url}">${name}</a>
</li>`
}

