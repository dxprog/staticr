import { IPost } from './post';
import { IRenderedPage } from './rendered-page';

export interface IRenderer {
  renderPosts(posts: Array<IPost>): Promise<Array<IRenderedPage>>;
}