const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const stylesheet = fs.readFileSync(`${__dirname}/../client/style.css`);
const mainjs = fs.readFileSync(`${__dirname}/../client/main.js`);
const vueComps = fs.readFileSync(`${__dirname}/../client/vue-components.js`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getStylesheet = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(stylesheet);
  response.end();
};

const getMainjs = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(mainjs);
  response.end();
};

const getVueComps = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(vueComps);
  response.end();
};

module.exports = {
  getIndex,
  getStylesheet,
  getMainjs,
  getVueComps,
};
