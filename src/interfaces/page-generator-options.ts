import { IRenderer } from './renderer';

export interface IPageGeneratorOptions {
  contentDir?: string;
  outputDir?: string;
  renderers?: Array<IRenderer>;
}