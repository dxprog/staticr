import * as React from 'react';
import { ReactElement } from 'react';

import { IPost } from '../interfaces/post';
import { IRenderer } from '../interfaces/renderer';
import { IRenderedPage } from '../interfaces/rendered-page';

import { PostsRollup } from '../components/posts-rollup';

/**
 * Renders individual posts pages
 */
export const PostsRollupRenderer: IRenderer = {
  renderPosts(posts: Array<IPost>): Promise<Array<IRenderedPage>> {
    let sortedPosts = [ ...posts ];
    sortedPosts.sort((a: IPost, b: IPost) => {
      return (new Date(a.attributes.date)).getTime() > (new Date(b.attributes.date)).getTime() ? -1 : 1;
    });

    return Promise.resolve([{
      title: 'Archives Page 1',
      pageComponent: <PostsRollup posts={sortedPosts} />,
      path: `/`
    }]);
  }
};