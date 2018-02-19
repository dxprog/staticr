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
      <article>
        <h2>
          <a href={this.props.siteGenerator.generateUrl(path)}>
            {this.props.post.attributes.title}
          </a>
        </h2>
        <time>{moment(this.props.post.attributes.date).format('MMMM D, YYYY')}</time>
        <div dangerouslySetInnerHTML={{ __html: this.props.post.html}} />
      </article>
    );
  }
}