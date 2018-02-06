import { ReactElement, Component } from 'react';

export default interface IRenderedPost {
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
}