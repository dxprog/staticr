import { IPost } from './post';

export interface IPostsRollupPage {
  /**
   * The current page number for these posts
   */
  pageNum: number;

  /**
   * The previous page number (if any)
   */
  previousPage?: number;

  /**
   * The next page number (if any)
   */
  nextPage?: number;

  /**
   * The posts to render for this page
   */
  posts: Array<IPost>;

  /**
   * All sorted posts being iterated through
   */
  sortedPosts: Array<IPost>;

  /**
   * Current index within the sorted posts
   */
  sortedPostIndex: number;
}
