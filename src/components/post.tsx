import * as moment from 'moment-timezone';
import * as React from 'react';
import { ReactNode } from 'react';

import { IPost } from '../interfaces/post';
import { SiteGenerator } from '../site-generator';

export interface IPostProps {
  post: IPost;
  siteGenerator: SiteGenerator;
}

export class Post extends React.Component<IPostProps, undefined> {
  public props: IPostProps;

  render(): ReactNode {
    const path = `entry/${this.props.post.attributes.slug}`;
    return (
      <article className="post">
        <header className="post__header">
          <h1 className="post__title">
            <a href={this.props.siteGenerator.generateUrl(path)}>
              {this.props.post.attributes.title}
            </a>
          </h1>
          <time className="post__published">
            {moment(this.props.post.attributes.date).format('MMMM D, YYYY')}
          </time>
        </header>
        <div className="post__content" dangerouslySetInnerHTML={{ __html: this.props.post.html}} />
      </article>
    );
  }
}