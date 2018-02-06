import * as React from 'react';
import { ReactElement } from 'react';

import IPost from '../interfaces/post';
import IRenderer from '../interfaces/renderer';
import IRenderedPage from '../interfaces/rendered-page';

import PostsRollup from '../components/posts-rollup';

/**
 * Renders individual posts pages
 */
const PostsRollupRenderer: IRenderer = {
  renderPosts(posts: Array<IPost>): Promise<Array<IRenderedPage>> {
    return new Promise((resolve, reject) => {
      resolve([{
        title: 'Archives Page 1',
        pageComponent: <PostsRollup posts={posts} />,
        path: `archives/`
      }]);
    });
  }
};

export default PostsRollupRenderer;