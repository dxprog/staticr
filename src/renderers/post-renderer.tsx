import * as React from 'react';
import { ReactElement } from 'react';

import { IPost } from '../interfaces/post';
import { IRenderer } from '../interfaces/renderer';
import { IRenderedPage } from '../interfaces/rendered-page';

import { Post } from '../components/post';
import { SiteGenerator } from '../site-generator';

/**
 * Renders individual posts pages
 */
export const PostRenderer: IRenderer = {
  renderPosts(posts: Array<IPost>, siteGenerator: SiteGenerator): Promise<Array<IRenderedPage>> {
    return new Promise((resolve, reject) => {
      resolve(posts.map((post: IPost): IRenderedPage => {
        const path = `entry/${post.attributes.slug}`;
        return {
          title: post.attributes.title,
          pageComponent: <Post post={post} siteGenerator={siteGenerator} />,
          path
        };
      }));
    });
  }
};