import * as path from 'path';

import IPost from './interfaces/post';
import PostsReader from './posts-reader';
import PostRenderer from './post-renderer';

export default class PageGenerator {
  private basePath: string;
  private postsReader: PostsReader;
  private postRenderer: PostRenderer;

  constructor(basePath: string) {
    this.basePath = basePath || process.cwd();
    this.postsReader = new PostsReader(path.join(this.basePath, 'posts/'));
    this.postRenderer = new PostRenderer(path.join(this.basePath, 'templates/'));
  }

  build() {
    return this.postsReader.read().then((posts: Array<IPost>) => {
      posts.forEach((post: IPost) => {
        console.log(this.postRenderer.render(post));
      });
    });
  }
};