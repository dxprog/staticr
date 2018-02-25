import * as React from 'react';
import { ReactElement } from 'react';

import { IPost } from '../interfaces/post';
import { IPostsRollupPage } from '../interfaces/posts-rollup-page';
import { IRenderer } from '../interfaces/renderer';
import { IRenderedPage } from '../interfaces/rendered-page';

import { PostsRollup } from '../components/posts-rollup';
import { SiteGenerator } from '../site-generator';

const POSTS_PER_PAGE = 2;

export type PostsIterator = (posts: IPostsRollupPage) => void;

/**
 * Renders individual posts pages
 */
export class PostsRollupRenderer implements IRenderer {
  private postsPerPage: number;

  constructor(postsPerPage: number = POSTS_PER_PAGE) {
    this.postsPerPage = postsPerPage;
  }

  iteratePostPages(posts: Array<IPost>, cb: PostsIterator) {
    let sortedPosts = [ ...posts ];
    sortedPosts.sort((a: IPost, b: IPost) => {
      return (new Date(a.attributes.date)).getTime() > (new Date(b.attributes.date)).getTime() ? -1 : 1;
    });

    // Render in pages of five
    let pageNum = 0;
    for (let i: number = 0; i < sortedPosts.length; i += this.postsPerPage) {
      pageNum++;
      const postsToRender = sortedPosts.slice(i, i + this.postsPerPage);
      const previousPage = i > 0 ? pageNum - 1 : null;
      const nextPage = i + this.postsPerPage < sortedPosts.length ? pageNum + 1 : null;
      cb({
        pageNum,
        previousPage,
        nextPage,
        posts: postsToRender
      });
    }
  }

  renderPosts(posts: Array<IPost>, siteGenerator: SiteGenerator): Promise<Array<IRenderedPage>> {
    const pages: Array<IRenderedPage> = [];
    this.iteratePostPages(posts, (postsPage: IPostsRollupPage) => {
      pages.push({
        title: `Archives - Page ${postsPage.pageNum}`,
        path: `archives/${postsPage.pageNum}`,
        pageComponent: (
          <PostsRollup
            posts={postsPage.posts}
            siteGenerator={siteGenerator}
            previousPage={postsPage.previousPage}
            nextPage={postsPage.nextPage} />
        )
      });
    });

    return Promise.resolve(pages);
  }
};