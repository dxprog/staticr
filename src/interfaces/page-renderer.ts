import { IRenderedPage } from './rendered-page';
import { SiteGenerator } from '../site-generator';

export interface IPageRenderer {
  renderPage(page: IRenderedPage, siteGenerator: SiteGenerator): IRenderedPage;
}