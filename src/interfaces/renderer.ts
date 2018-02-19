import { IPost } from './post';
import { IRenderedPage } from './rendered-page';
import { SiteGenerator } from '../site-generator';

export interface IRenderer {
  renderPosts(posts: Array<IPost>, siteGenerator: SiteGenerator): Promise<Array<IRenderedPage>>;
}