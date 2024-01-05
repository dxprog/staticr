import { ReactElement, Component } from 'react';

import { IPageRenderer } from './page-renderer';

export interface IRenderedPage {
  /**
   * The <title> of the page
   */
  title: string;

  /**
   * Any tags to place in the page <head>
   */
  headComponents?: Array<ReactElement> | ReactElement<any>;

  /**
   * The rendered ReactElement to be placed in the page body
   */
  pageComponent: ReactElement<any>;

  /**
   * The URL path of the page
   */
  path: string;

  /**
   * The page HTML to be written to disk
   * TODO: probably not do this...
   */
  pageHtml?: string;

  /**
   * Overrides the default page renderer
   */
  pageRenderer?: IPageRenderer;
}
