import * as bluebird from 'bluebird';
import * as fs from 'fs';
import * as fm from 'front-matter';
import * as marked from 'marked';
import * as path from 'path';

const readdirAsync: Function = bluebird.promisify(fs.readdir);
const readFileAsync: Function = bluebird.promisify(fs.readFile);

export default class PostsReader {
  private path: string;
  private posts: Array<any>;

  constructor(path: string) {
    this.path = path;
    this.posts = [];
  }

  read() {
    return readdirAsync(this.path)
      .then((posts: any) => Promise.all(posts.map((post: any) => {
        return readFileAsync(path.join(this.path, post)).then((data: any) => {
          const retVal: any = fm(data.toString('utf-8'));
          retVal.html = marked(retVal.body.trim());
          return retVal;
        });
      })));
  }
};