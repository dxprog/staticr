import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';

export default class PostRenderer {
  private postTemplate: Function;

  constructor(templatePath: string) {
    const templateSrc = fs.readFileSync(path.join(templatePath, 'post.hbs'));
    this.postTemplate = Handlebars.compile(templateSrc.toString('utf-8'));
  }

  render(post: any) {
    return this.postTemplate(post);
  }
}