import * as path from 'path';
import * as React from 'react';
import { ReactNode, ReactElement, Component } from 'react';
import * as url from 'url';

// Interfaces
import { IContentReader } from './interfaces/content-reader';
import { ISiteGeneratorOptions } from './interfaces/page-generator-options';
import { IPost } from './interfaces/post';
import { IRenderedPage } from './interfaces/rendered-page';
import { IRenderer } from './interfaces/renderer';

// Renderers
import { PageRenderer } from './renderers/page-renderer';
import { PostRenderer } from './renderers/post-renderer';
import { PostsRollupRenderer } from './renderers/posts-rollup-renderer';
import { PostRedirectRenderer } from './renderers/post-redirect-renderer';

import { PostsReader } from './posts-reader';
import { SiteWriter } from './site-writer';

const DEFAULT_OPTIONS: ISiteGeneratorOptions = {
  contentDir: process.cwd(),
  outputDir: path.join(process.cwd(), 'build/'),
  renderers: [
    PostRenderer,
    PostRedirectRenderer,
    new PostsRollupRenderer()
  ]
};

export class SiteGenerator {
  private basePath: string;
  private baseUrl: string;
  private readers: Array<IContentReader>;
  private renderers: Array<IRenderer>;
  public writer: SiteWriter;

  constructor(options: ISiteGeneratorOptions = DEFAULT_OPTIONS) {
    options = {  ...DEFAULT_OPTIONS, ...options };
    this.basePath = options.contentDir;
    this.baseUrl = options.baseUrl;
    this.readers = [ new PostsReader(path.join(this.basePath, 'posts/')) ];
    this.renderers = options.renderers;
    this.writer = new SiteWriter(options.outputDir);
  }

  public build(): Promise<any> {
    return this.readPosts()
      .then((posts: Array<IPost>) => Promise.all(
        this.renderers.map((renderer: IRenderer) => renderer.renderPosts(posts, this))
      ))
      .then((renders: Array<Array<IRenderedPage>>): Array<IRenderedPage> => {
        return renders.reduce((allRenders: Array<IRenderedPage>, currentRenders: Array<IRenderedPage>) =>
          [ ...allRenders, ...currentRenders ], []
        ).map((render: IRenderedPage) =>
          render.pageRenderer ? render.pageRenderer.renderPage(render, this) : PageRenderer.renderPage(render, this)
        );
      })
      .then((renders: Array<IRenderedPage>) => this.writer.write(renders))
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

  public addReader(reader: IContentReader) {
    this.readers.push(reader);
  }

  public addRenderer(renderer: IRenderer) {
    this.renderers.push(renderer);
  }

  public generateUrl(urlPath: string) {
    let retVal = urlPath;
    if (this.baseUrl) {
      retVal = url.resolve(this.baseUrl, urlPath);
    }
    return retVal;
  }
};