import * as path from 'path';
import { renderToStaticMarkup } from 'react-dom/server';
import * as React from 'react';
import { ReactNode } from 'react';

import IPost from './interfaces/post';
import PostsReader from './posts-reader';

import Page from './components/page';
import Post from './components/post';

export default class PageGenerator {
  private basePath: string;
  private postsReader: PostsReader;

  constructor(basePath: string) {
    this.basePath = basePath || process.cwd();
    this.postsReader = new PostsReader(path.join(this.basePath, 'posts/'));
  }

  build() {
    return this.postsReader.read().then((posts: Array<IPost>) => {
      const postsCollection: Array<ReactNode> =
        posts.map((post: IPost, index: number) => <Post post={post} key={`post-${index}`} />);
      console.log(renderToStaticMarkup(<Page title="Hello, world" bodyNodes={postsCollection} />));
    });
  }
};