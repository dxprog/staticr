import * as React from 'react';
import { ReactNode } from 'react';

import { IPost } from '../interfaces/post';
import { Post } from './post';
import { SiteGenerator } from '../site-generator';

export interface IPostsRollup {
  posts: Array<IPost>;
  siteGenerator: SiteGenerator;
  previousPage?: number;
  nextPage?: number;
}

export class PostsRollup extends React.Component<IPostsRollup, undefined> {
  public props: IPostsRollup;

  render(): ReactNode {
    let previousLink;
    if (this.props.previousPage) {
      previousLink = (
        <a href={this.props.siteGenerator.generateUrl(`archives/${this.props.previousPage}.html`)} className="paging__link paging__link--previous">
          Later Posts
        </a>
      );
    }

    let nextLink;
    if (this.props.nextPage) {
      nextLink = (
        <a href={this.props.siteGenerator.generateUrl(`archives/${this.props.nextPage}.html`)} className="paging__link paging__link--next">
          Earlier Posts
        </a>
      );
    }

    return (
      <section className="article-list">
        {this.props.posts.map((post: IPost, idx: number) =>
          <Post post={post} siteGenerator={this.props.siteGenerator} key={`post-${idx}`} />
        )}
        <div className="paging">
          {nextLink}
          {previousLink}
        </div>
      </section>
    );
  }
}