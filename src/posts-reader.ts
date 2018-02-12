import * as fs from 'fs-extra';
import * as fm from 'front-matter';
import * as marked from 'marked';
import * as path from 'path';

import { IPost } from './interfaces/post';
import { IContentReader } from './interfaces/content-reader';

export class PostsReader implements IContentReader {
  private path: string;
  private posts: Array<any>;

  constructor(path: string) {
    this.path = path;
    this.posts = [];
  }

  read(): Promise<Array<IPost>> {
    return fs.readdir(this.path)
      .then((posts: Array<string>) => Promise.all(posts.map((post: string) => {
        return fs.readFile(path.join(this.path, post)).then((data: Buffer) => {
          const retVal: IPost = fm(data.toString('utf-8'));
          retVal.html = marked(retVal.body.trim());
          return retVal;
        });
      })));
  }
};