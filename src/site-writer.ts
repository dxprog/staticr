import * as fs from 'fs-extra';
import * as path from 'path';

import { IRenderedPage } from './interfaces/rendered-page';

export class SiteWriter {
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

      return fs.mkdirs(dirPath)
        .then(() => fs.writeFile(filePath, render.pageHtml));
    }));
  }
}