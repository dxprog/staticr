import * as React from 'react';
import { ReactElement } from 'react';

import IPost from '../interfaces/post';
import IRenderer from '../interfaces/renderer';
import IRenderedPage from '../interfaces/rendered-page';

import Post from '../components/post';

/**
 * Renders individual posts pages
 */
const PostRenderer: IRenderer = {
  renderPosts(posts: Array<IPost>): Promise<Array<IRenderedPage>> {
    return new Promise((resolve, reject) => {
      resolve(posts.map((post: IPost): IRenderedPage => {
        return {
          title: post.attributes.title,
          pageComponent: <Post post={post} />,
          path: `entry/${post.attributes.slug}`
        };
      }));
    });
  }
};

export default PostRenderer;