
function buildHTMLPage (newElem) {
  const htmlTemplate = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>The Elements - ${newElem.elementName}</title>
    <link rel="stylesheet" href="/css/styles.css">
  </head>
  <body>
    <h1>${newElem.elementSymbol}</h1>
    <h2>${newElem.elementAtomicNumber}</h2>
    <h3>Atomic number ${newElem.elementAtomicNumber}</h3>
    <p>${newElem.elementDescription}</p>
    <p><a href="/">back</a></p>
  </body>
  </html>`;

  return htmlTemplate;
};

module.exports = {
  buildHTMLPage: buildHTMLPage,
}