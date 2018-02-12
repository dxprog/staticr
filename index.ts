import { PageGenerator } from './src/page-generator';
import * as path from 'path';

const pg = new PageGenerator({
  contentDir: path.join(process.cwd(), 'tests/mocksite')
});

pg.writer.addStaticContent('static', path.resolve(process.cwd(), 'tests/mocksite/static'));

pg.build().then(result => {

});