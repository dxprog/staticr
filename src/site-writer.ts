import * as fs from 'fs-extra';
import * as path from 'path';

import { IRenderedPage } from './interfaces/rendered-page';

interface IStaticContent {
  pathName: string;
  srcPath: string;
}

export class SiteWriter {
  private outputPath: string;
  private staticContent: Array<IStaticContent>;

  constructor(outputPath: string) {
    this.outputPath = outputPath;
    this.staticContent = [];
  }

  addStaticContent(pathName: string, srcPath: string) {
    this.staticContent.push({
      pathName,
      srcPath: path.resolve(srcPath)
    });
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
    }))
      // Copy static content
      .then(() => Promise.all(this.staticContent.map(staticContent => {
        const outputPath: string = path.resolve(this.outputPath, staticContent.pathName);
        return fs.mkdirs(staticContent.pathName)
          .then(() => fs.copy(staticContent.srcPath, outputPath));
      })));
  }
}