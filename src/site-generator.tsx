import * as path from 'path';
import * as React from 'react';
import { ReactNode, ReactElement, Component } from 'react';

// Interfaces
import { IContentReader } from './interfaces/content-reader';
import { IPageGeneratorOptions } from './interfaces/page-generator-options';
import { IPost } from './interfaces/post';
import { IRenderedPage } from './interfaces/rendered-page';
import { IRenderer } from './interfaces/renderer';

// Renderers
import { PageRenderer } from './renderers/page-renderer';
import { PostRenderer } from './renderers/post-renderer';
import { PostsRollupRenderer } from './renderers/posts-rollup-renderer';

import { PostsReader } from './posts-reader';
import { SiteWriter } from './site-writer';

const HTML_DOCTYPE: string = '<!DOCTYPE html>\n';
const DEFAULT_OPTIONS: IPageGeneratorOptions = {
  contentDir: process.cwd(),
  outputDir: path.join(process.cwd(), 'build/'),
  renderers: [ PostRenderer, PostsRollupRenderer ]
};

export class SiteGenerator {
  private basePath: string;
  private readers: Array<IContentReader>;
  private renderers: Array<IRenderer>;
  public writer: SiteWriter;

  constructor(options: IPageGeneratorOptions = DEFAULT_OPTIONS) {
    options = {  ...DEFAULT_OPTIONS, ...options };
    this.basePath = options.contentDir;
    this.readers = [ new PostsReader(path.join(this.basePath, 'posts/')) ];
    this.renderers = options.renderers;
    this.writer = new SiteWriter(options.outputDir);
  }

  public build(): Promise<any> {
    return this.readPosts()
      .then((posts: Array<IPost>) => Promise.all(
        this.renderers.map((renderer: IRenderer) => renderer.renderPosts(posts))
      ))
      .then((renders: Array<Array<IRenderedPage>>): Array<IRenderedPage> => {
        return renders.reduce((allRenders: Array<IRenderedPage>, currentRenders: Array<IRenderedPage>) =>
          [ ...allRenders, ...currentRenders ], []
        ).map((render: IRenderedPage) =>
          render.pageRenderer ? render.pageRenderer.renderPage(render) : PageRenderer.renderPage(render)
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
};