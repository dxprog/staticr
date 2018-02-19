import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { IPageRenderer } from '../interfaces/page-renderer';
import { IRenderedPage } from '../interfaces/rendered-page';
import { Page } from '../components/page';
import { SiteGenerator } from '../site-generator';

const HTML_DOCTYPE: string = '<!DOCTYPE html>\n';

export const PageRenderer: IPageRenderer = {
  renderPage(page: IRenderedPage, siteGenerator: SiteGenerator): IRenderedPage {
    page.pageHtml = `${HTML_DOCTYPE}${renderToStaticMarkup(
      <Page title={page.title} bodyNodes={page.pageComponent} siteGenerator={siteGenerator} />
    )}`;
    return page;
  }
};