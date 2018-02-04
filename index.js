const PageGenerator = require('./src/page-generator');
const path = require('path');

const pg = new PageGenerator(path.join(process.cwd(), 'tests/mocksite'));

pg.build().then(result => {

});