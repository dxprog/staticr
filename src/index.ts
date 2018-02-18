export * from './site-generator';
export * from './posts-reader';
export * from './interfaces/post';
export * from './interfaces/rendered-page';
export * from './interfaces/renderer';
export * from './interfaces/content-reader';

import { IPageRenderer } from './interfaces/page-renderer';
import { IRenderer } from './interfaces/renderer';
import { PostsRollupRenderer } from './renderers/posts-rollup-renderer';
import { PostRenderer } from './renderers/post-renderer';
import { PageRenderer } from './renderers/page-renderer';
export const Renderers = {
  PageRenderer,
  PostRenderer,
  PostsRollupRenderer,
};

import { Page } from './components/page';
import { Post } from './components/post';
import { PostsRollup } from './components/posts-rollup';
export const Components = {
  Page,
  Post,
  PostsRollup,
};