const public = "./public";
const fs = require('fs');
const qs = require('querystring');

function delReq (request, response) {
  console.log(request.url);
}

module.exports = {
  delReq: delReq,
}
