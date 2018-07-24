const public = "./public";
const fs = require('fs');
const qs = require('querystring');

function putReq (request, response) {
  fs.readFile(`${public}${request.url}`, (err, data) => {
    if (err) {
    throw 'No such file in directory';
    response.end();
    } else {
      request.on('data', (data) => {
        let parsedData = qs.parse(data.toString());
        console.log(parsedData);
      })
    }
  })
}

module.exports = {
  putReq: putReq,
}