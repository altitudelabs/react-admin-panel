const ghpages = require('gh-pages');
const path = require('path');
// const pug = require('pug');
const fs = require('fs');

const indexHTMLSourcePath = path.join(__dirname, '../client/gh.html');
const indexHTMLPath = path.join(__dirname, '../client/dist');
// synchronous because this is a build script and need to know explicitly when it finishes
const viewIndexPath = path.join(indexHTMLPath, 'index.html');
const view404Path = path.join(indexHTMLPath, '404.html');

const viewString = fs.readFileSync(indexHTMLSourcePath);

fs.writeFileSync(viewIndexPath, viewString);
fs.writeFileSync(view404Path, viewString);

ghpages.publish(path.join(__dirname, '../client/dist'), () => {
  console.log('deployment to gh-pages complete!');
});
