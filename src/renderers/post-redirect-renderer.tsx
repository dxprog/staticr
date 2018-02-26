import * as React from 'react';
import { ReactElement } from 'react';

import { IPost } from '../interfaces/post';
import { IRenderer } from '../interfaces/renderer';
import { IRenderedPage } from '../interfaces/rendered-page';

import { SiteGenerator } from '../site-generator';
import { RedirectPageRenderer } from './redirect-page-renderer';

/**
 * Renders redirect pages for posts that have them defined
 */
export const PostRedirectRenderer: IRenderer = {
  renderPosts(posts: Array<IPost>, siteGenerator: SiteGenerator): Promise<Array<IRenderedPage>> {
    return new Promise((resolve, reject) => {
      resolve(posts.reduce((out: Array<IRenderedPage>, post: IPost): Array<IRenderedPage> => {
        if (Array.isArray(post.attributes.redirect_from)) {
          const redirectTo = siteGenerator.generateUrl(`entry/${post.attributes.slug}`);
          const redirectFrom: Array<string> = post.attributes.redirect_from;

          redirectFrom.forEach(redirect => {
            // If the last part of the URL is empty, this
            // should be the index of a new directory
            const redirectPathTokens = redirect.split('/');
            if (!redirectPathTokens[redirectPathTokens.length - 1]) {
              redirectPathTokens[redirectPathTokens.length - 1] = 'index';
            }
            const redirectPath = redirectPathTokens.join('/');

            out.push({
              title: post.attributes.title,
              pageComponent: <meta httpEquiv="refresh" content={`0;URL=${redirectTo}`} />,
              path: redirectPath,
              pageRenderer: RedirectPageRenderer
            });
          });
        }
        return out;
      }, []));
    });
  }
};