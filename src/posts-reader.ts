import * as bluebird from 'bluebird';
import * as fs from 'fs';
import * as fm from 'front-matter';
import * as marked from 'marked';
import * as path from 'path';

import { IPost } from './interfaces/post';

const readdirAsync: Function = bluebird.promisify(fs.readdir);
const readFileAsync: Function = bluebird.promisify(fs.readFile);

export class PostsReader {
  private path: string;
  private posts: Array<any>;

  constructor(path: string) {
    this.path = path;
    this.posts = [];
  }

  read(): Promise<Array<IPost>> {
    return readdirAsync(this.path)
      .then((posts: Array<string>) => Promise.all(posts.map((post: string) => {
        return readFileAsync(path.join(this.path, post)).then((data: Buffer) => {
          const retVal: IPost = fm(data.toString('utf-8'));
          retVal.html = marked(retVal.body.trim());
          return retVal;
        });
      })));
  }
};