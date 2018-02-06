import * as React from 'react';
import { ReactNode } from 'react';

import IPost from '../interfaces/post';

import Post from './post';

interface Props {
  posts: Array<IPost>;
}

export default class PostsRollup extends React.Component<Props, undefined> {
  public props: Props;

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