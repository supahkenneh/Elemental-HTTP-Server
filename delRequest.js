const public = "./public";
const fs = require('fs');

function delReq (request, response) {
  console.log(request.url);
  fs.unlink(`${public}${request.url}`, (err) => {
    if (err) {
      response.writeHead(500, {'Content-Type' : 'application/json'} );
      response.end(JSON.stringify({ "error" : `resource/ ${request.url} does not exist!`} ));
    } else {
      response.writeHead(200, {'Content-Type' : 'application/json'} );
      response.end(JSON.stringify( { "success" : true} ), () => {
        console.log('File successfully deleted');
      });
    }
  })
}

module.exports = {
  delReq: delReq,
}
