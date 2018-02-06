import IPost from './post';
import IRenderedPage from './rendered-page';

export default interface IRenderer {
  renderPosts(posts: Array<IPost>): Promise<Array<IRenderedPage>>;
}