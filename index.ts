import PageGenerator from './src/page-generator';
import * as path from 'path';

const pg = new PageGenerator({
  contentDir: path.join(process.cwd(), 'tests/mocksite')
});

pg.build().then(result => {

});