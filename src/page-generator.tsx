import * as path from 'path';
import { renderToStaticMarkup } from 'react-dom/server';
import * as React from 'react';
import { ReactNode, ReactElement, Component } from 'react';

import Page from './components/page';
import PostsReader from './posts-reader';
import PostRenderer from './renderers/post-renderer';
import PostsRollupRenderer from './renderers/posts-rollup-renderer';
import SiteWriter from './site-writer';

import IPageGeneratorOptions from './interfaces/page-generator-options';
import IPost from './interfaces/post';
import IRenderedPost from './interfaces/rendered-page';
import IRenderer from './interfaces/renderer';

const HTML_DOCTYPE: string = '<!DOCTYPE html>\n';
const DEFAULT_OPTIONS: IPageGeneratorOptions = {
  contentDir: process.cwd(),
  outputDir: path.join(process.cwd(), 'build/')
};

export default class PageGenerator {
  private basePath: string;
  private readers: Array<PostsReader>;
  private renderers: Array<IRenderer>;
  private writer: SiteWriter;

  constructor(options: IPageGeneratorOptions = DEFAULT_OPTIONS) {
    options = {  ...DEFAULT_OPTIONS, ...options };
    this.basePath = options.contentDir;
    this.readers = [ new PostsReader(path.join(this.basePath, 'posts/')) ];
    this.renderers = [ PostRenderer, PostsRollupRenderer ];
    this.writer = new SiteWriter(options.outputDir);
  }

  public build(): Promise<any> {
    return this.readPosts()
      .then((posts: Array<IPost>) => Promise.all(
        this.renderers.map((renderer: IRenderer) => renderer.renderPosts(posts))
      ))
      .then((renders: Array<Array<IRenderedPost>>): Array<IRenderedPost> => {
        return renders.reduce((allRenders: Array<IRenderedPost>, currentRenders: Array<IRenderedPost>) =>
          [ ...allRenders, ...currentRenders ], []
        ).map((render: IRenderedPost) => {
          render.pageHtml = `${HTML_DOCTYPE}${renderToStaticMarkup(
            <Page title={render.title} bodyNodes={render.pageComponent} />
          )}`;
          return render;
        });
      })
      .then((renders: Array<IRenderedPost>) => this.writer.write(renders))
      .catch(err => {
        console.error('Something barfed', err);
      });
  }

  /**
   * Invokes all PostsReaders and returns a flat array of IPost objects
   */
  private readPosts(): Promise<Array<IPost>> {
    const readers = this.readers.map((postReader: PostsReader) => postReader.read());
    return Promise.all(readers).then((posts: Array<Array<IPost>>) => {
      return posts.reduce((allPosts: Array<IPost>, readerPosts: Array<IPost>) => {
        return [ ...allPosts, ...readerPosts ];
      }, []);
    });
  }

  public addReader(reader: PostsReader) {
    this.readers.push(reader);
  }

  public addRenderer(renderer: IRenderer) {
    this.renderers.push(renderer);
  }
};