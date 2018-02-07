import * as React from 'react';
import { ReactNode } from 'react';

import { IPost } from '../interfaces/post';

import { Post } from './post';

export interface IPostsRollup {
  posts: Array<IPost>;
}

export class PostsRollup extends React.Component<IPostsRollup, undefined> {
  public props: IPostsRollup;

  render(): ReactNode {
    return (
      <section className="article-list">
        {this.props.posts.map((post: IPost, idx: number) =>
          <Post post={post} key={`post-${idx}`} />
        )}
      </section>
    );
  }
}