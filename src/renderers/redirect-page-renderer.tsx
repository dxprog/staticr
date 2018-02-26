import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { IPageRenderer } from '../interfaces/page-renderer';
import { IRenderedPage } from '../interfaces/rendered-page';
import { Page } from '../components/page';
import { SiteGenerator } from '../site-generator';

const HTML_DOCTYPE: string = '<!DOCTYPE html>\n';

export const RedirectPageRenderer: IPageRenderer = {
  renderPage(page: IRenderedPage, siteGenerator: SiteGenerator): IRenderedPage {
    page.pageHtml = `${HTML_DOCTYPE}${renderToStaticMarkup(
      <html>
        <head>
          <title>{page.title}</title>
          {page.pageComponent}
        </head>
      </html>
    )}`;
    return page;
  }
};