const public = "./public";
const fs = require('fs');
const qs = require('querystring');
const buildPage = require('./elementTemplate');

function putReq(request, response) {
  fs.readFile(`${public}${request.url}`, (err, data) => {

    if (err) {
      
      response.writeHead(500, {'Content-Type' : 'application/json' });
      response.end(JSON.stringify({ "error" : `resource/ ${request.url} does not exist!`} ));
      
    } else {

      request.on('data', (data) => {

        let parsedData = qs.parse(data.toString());
        fs.writeFile(`${public}/${request.url}`, buildPage.buildHTMLPage(parsedData), () => {
          
          response.writeHead(200, { 'Content-Type': 'application/json'});
          response.end(JSON.stringify({ "success" : true }), () => {
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