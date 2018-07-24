const public = "./public";
const fs = require('fs');
const qs = require('querystring');
const elemArr = ['hydrogen', 'helium'];

function postReq (request, response) {
  
  request.on('data', (data) => {
    let parsedData = qs.parse(data.toString());
    let newFile = `${request.url.substring(1, request.url.length)}`
    elemArr.push(parsedData.name.toLowerCase());
  
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
      <h3>These are ${elemArr.length}</h3>
      <ol>
      ${generateLinks()}
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

function generateLinks() {
  let elementList = '';
  for (let i = 0; i < elemArr.length; i++) {
    elementList = elementList.concat(`<li><a href="/${elemArr[i]}.html">${elemArr[i]}</a></li>\n`);
  }
  return elementList;
}

module.exports = {
  postReq: postReq,
}