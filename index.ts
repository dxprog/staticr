import { SiteGenerator } from './src/site-generator';
import * as path from 'path';

const pg = new SiteGenerator({
  contentDir: path.join(process.cwd(), 'tests/mocksite')
});

pg.writer.addStaticContent('static', path.resolve(process.cwd(), 'tests/mocksite/static'));

pg.build().then(result => {

});