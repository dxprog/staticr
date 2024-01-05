import * as React from 'react';
import { ReactNode, ReactElement } from 'react';

import { SiteGenerator } from '../site-generator';

export interface IPageProps {
  title: string;
  headNodes?: Array<ReactNode> | ReactElement<any>;
  bodyNodes: Array<ReactNode> | ReactElement<any>;
  siteGenerator: SiteGenerator;
}

export class Page extends React.Component<IPageProps, undefined> {
  public props: IPageProps;

  render(): ReactNode {
    return (
      <html>
        <head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <title>{`${this.props.title}${this.props.siteGenerator.siteTitle}`}</title>
          <link rel="stylesheet" type="text/css" href={this.props.siteGenerator.generateUrl('static/css/index.css')} />
          {this.props.headNodes}
        </head>
        <body>
          {this.props.bodyNodes}
        </body>
      </html>
    );
  }
}
