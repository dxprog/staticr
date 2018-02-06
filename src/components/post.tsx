import * as React from 'react';

import IPost from '../interfaces/post';
import { ReactNode } from 'react';

interface Props {
  post: IPost;
}

export class Post extends React.Component<Props, undefined> {
  public props: Props;

  render(): ReactNode {
    return (
      <article>
        <h2>{this.props.post.attributes.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: this.props.post.html}} />
      </article>
    );
  }
}