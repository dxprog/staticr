import { IRenderedPage } from './rendered-page';

export interface IPageRenderer {
  renderPage(page: IRenderedPage): IRenderedPage;
}