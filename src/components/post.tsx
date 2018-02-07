import * as React from 'react';
import { ReactNode } from 'react';

import { IPost } from '../interfaces/post';

export interface IPostProps {
  post: IPost;
}

export class Post extends React.Component<IPostProps, undefined> {
  public props: IPostProps;

  render(): ReactNode {
    return (
      <article>
        <h2>{this.props.post.attributes.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: this.props.post.html}} />
      </article>
    );
  }
}