const fs = require('fs');
const public = "./public";


function getReq(fileURL, response) {
  let path = fileURL === '/' ? `/index.html` : fileURL;
  fs.readFile(`${public}${path}`, (err, data) => {
    if (err) {
      fs.readFile(`${public}/404.html`, (err, data) => {
        response.write(data.toString().trim());
        response.end(() => {
        })
      })
    } else {
      response.writeHead(200, { 'Content-Type': `text/${fileURL.substring(fileURL.lastIndexOf('.')+1)}` });
      response.write(data.toString().trim());
      response.end(() => {
        console.log('Request fulfilled');
      });
    }
  })
};

module.exports = {
  getReq: getReq,
}