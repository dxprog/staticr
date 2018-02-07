import { ReactElement, Component } from 'react';

export interface IRenderedPage {
  /**
   * The <title> of the page
   */
  title: string;

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
}