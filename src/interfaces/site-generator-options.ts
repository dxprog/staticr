import { IRenderer } from './renderer';

export interface ISiteGeneratorOptions {
  contentDir?: string;
  outputDir?: string;
  renderers?: Array<IRenderer>;
  baseUrl?: string;
  markedOptions?: object;
}