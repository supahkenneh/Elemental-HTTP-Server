const fs = require('fs');
const public = "./public";


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

module.exports = {
  getReq: getReq,
}