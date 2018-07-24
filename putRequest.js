const public = "./public";
const fs = require('fs');
const qs = require('querystring');
const buildPage = require('./elementTemplate');

function putReq(request, response) {
  fs.readFile(`${public}${request.url}`, (err, data) => {
    if (err) {
      fs.writeHead(500, {'Content-Type' : 'application/json', 'Content-Body' : `{ "error" : "resource/ ${request.url} does not exist!}`});
      throw 'No such file in directory';
    } else {
      request.on('data', (data) => {
        let parsedData = qs.parse(data.toString());
        fs.writeFile(`${public}/${request.url}`, buildPage.buildHTMLPage(parsedData), () => {
          response.writeHead(200, { 'Content-Type': 'application/json', 'Content-Body': '{ "success" : true}' });
          response.end(() => {
            console.log('Put request complete');
          })
        });
      })
    }
  })
}

module.exports = {
  putReq: putReq,
}