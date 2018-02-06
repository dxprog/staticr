import * as bluebird from 'bluebird';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';

import IRenderedPage from './interfaces/rendered-page';

const writeFileAsync = bluebird.promisify(fs.writeFile);
const mkdirpAsync = bluebird.promisify(mkdirp);

export default class SiteWriter {
  private outputPath: string;

  constructor(outputPath: string) {
    this.outputPath = outputPath;
  }

  write(renders: Array<IRenderedPage>): Promise<any> {
    return Promise.all(renders.map((render: IRenderedPage) => {
      let filePath = path.join(this.outputPath, `${render.path}.html`);
      const dirPath = path.dirname(filePath);

      // Check to see if this is an index page
      if (filePath.split('/').pop() === '.html') {
        filePath = path.join(dirPath, 'index.html');
      }

      return mkdirpAsync(dirPath)
        .then(() => writeFileAsync(filePath, render.pageHtml));
    }));
  }
}