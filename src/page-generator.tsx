import * as path from 'path';
import { renderToStaticMarkup } from 'react-dom/server';
import * as React from 'react';
import { ReactNode, ReactElement } from 'react';

import PostsReader from './posts-reader';

import IPost from './interfaces/post';

import Page from './components/page';
import Post from './components/post';

export default class PageGenerator {
  private basePath: string;
  private readers: Array<PostsReader>;

  constructor(basePath: string) {
    this.basePath = basePath || process.cwd();
    this.readers = [ new PostsReader(path.join(this.basePath, 'posts/')) ];
  }

  public build(): Promise<void> {
    return this.readPosts().then((posts: Array<IPost>) => {
      const postsCollection: Array<ReactElement<Post>> =
        posts.map((post: IPost, index: number) => <Post post={post} key={`post-${index}`} />);
      console.log(renderToStaticMarkup(<Page title="Hello, world" bodyNodes={postsCollection} />));
    });
  }

  /**
   * Invokes all PostsReaders and returns a flat array of IPost objects
   */
  private readPosts(): Promise<Array<IPost>> {
    const readers = this.readers.map((postReader: PostsReader) => postReader.read());
    return Promise.all(readers).then((posts: Array<Array<IPost>>) => {
      return posts.reduce((allPosts: Array<IPost>, readerPosts: Array<IPost>) => {
        return [ ...allPosts, ...readerPosts ];
      }, []);
    });
  }

  public addReader(reader: PostsReader) {
    this.readers.push(reader);
  }
};