import * as React from 'react';
import { ReactElement } from 'react';

import { IPost } from '../interfaces/post';
import { IRenderer } from '../interfaces/renderer';
import { IRenderedPage } from '../interfaces/rendered-page';

import { PostsRollup } from '../components/posts-rollup';
import { SiteGenerator } from '../site-generator';

const POSTS_PER_PAGE = 2;

/**
 * Renders individual posts pages
 */
export class PostsRollupRenderer implements IRenderer {
  private postsPerPage: number;

  constructor(postsPerPage: number = POSTS_PER_PAGE) {
    this.postsPerPage = postsPerPage;
  }

  renderPosts(posts: Array<IPost>, siteGenerator: SiteGenerator): Promise<Array<IRenderedPage>> {
    let sortedPosts = [ ...posts ];
    sortedPosts.sort((a: IPost, b: IPost) => {
      return (new Date(a.attributes.date)).getTime() > (new Date(b.attributes.date)).getTime() ? -1 : 1;
    });

    // Render in pages of five
    const pages: Array<IRenderedPage> = [];
    let pageNum = 0;
    for (let i: number = 0; i < sortedPosts.length; i += this.postsPerPage) {
      pageNum++;
      const posts = sortedPosts.slice(i, i + this.postsPerPage);
      const previousPage = i > 0 ? pageNum - 1 : null;
      const nextPage = i + this.postsPerPage < sortedPosts.length ? pageNum + 1 : null;
      pages.push({
        title: `Archives - Page ${pageNum}`,
        path: `archives/${pageNum}`,
        pageComponent: <PostsRollup posts={posts} siteGenerator={siteGenerator} previousPage={previousPage} nextPage={nextPage} />
      });
    }

    return Promise.resolve(pages);
  }
};