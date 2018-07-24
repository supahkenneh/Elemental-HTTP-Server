const public = "./public";
const fs = require('fs');
const qs = require('querystring');
const buildPage = require(`./elementTemplate`);

function postReq(request, response) {

  if (!request.url.substring(1, request.url.length) || request.url.substring(1, request.url.length) !== 'elements') {
    fs.readFile(`${public}/404.html`, (err, data) => {
      response.writeHead(404, { 'Content': 'Not Found' })
      response.write(data.toString().trim());
      response.end(() => {
        console.log('Not found');
      });
    })
  } else {
    request.on('data', (data) => {
      let parsedData = qs.parse(data.toString());
      let newFile = `${parsedData.elementName.toLowerCase()}.html`
      generateLinks((list, numOfElems) => {

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
      <h3>These are ${numOfElems}</h3>
      <ol>
      ${list}
      </ol>
    </body>
    </html>`

        fs.writeFile(`${public}/${newFile}`, buildPage.buildHTMLPage(parsedData), (err) => {
          if (err) {
            console.log(err);
          } else {
            fs.writeFile(`${public}/index.html`, updatedIndex, (err) => {
              if (err) {
                console.log(err);
              } else {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ "success": true }), () => {
                  console.log('Write successful, Index Updated');
                });
              }
            })
          }
        })
      })
    });
  }
}

//creates list elements
function generateLinks(cb) {
  let elementList = '';
  fs.readdir(`${public}`, (err, data) => {
    for (let i = 1; i < data.length; i++) {
      if (data[i] !== `css` && data[i] !== `index.html` && data[i] !== `404.html`) {
        elementList = elementList.concat(`<li><a href="/${data[i]}.html">${data[i]}</a></li>\n`);
      }
    }
    let numOfElems = data.length - 4;
    return cb(elementList, numOfElems);
  });
}

module.exports = {
  postReq: postReq,
}