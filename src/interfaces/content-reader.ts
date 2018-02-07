import { IPost } from './post';

export interface IContentReader {
  read(): Promise<Array<IPost>>
}