import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import IPost from './interfaces/post';
import { Post } from './components/post';

export default class PostRenderer {
  private postTemplate: Function;

  constructor(templatePath: string) {
    const templateSrc = fs.readFileSync(path.join(templatePath, 'post.hbs'));
    this.postTemplate = Handlebars.compile(templateSrc.toString('utf-8'));
  }

  render(post: IPost) {
    const renderedPost = <Post post={post} />;
    return renderToStaticMarkup(renderedPost);
  }
}