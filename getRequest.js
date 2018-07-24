const fs = require('fs');
const public = "./public";


function getReq(fileURL, response) {
  let path = fileURL === '/' ? `/index.html` : fileURL;
  fs.readFile(`${public}${path}`, 'utf8', (err, data) => {
    if (err) {
      fs.readFile(`${public}/404.html`, (err, data) => {
        response.write(data);
        response.end(() => {
        })
      })
    } else {
      response.writeHead(200, { 'Content-Type': `text/${path.substring(path.lastIndexOf('.')+1)}` });
      response.write(data);
      response.end(() => {
        console.log('Request fulfilled');
      });
    }
  })
};

module.exports = {
  getReq: getReq,
}