import * as React from 'react';
import { ReactNode, ReactElement } from 'react';

import { SiteGenerator } from '../site-generator';

export interface IPageProps {
  title: string;
  bodyNodes: Array<ReactNode> | ReactElement<any>;
  siteGenerator: SiteGenerator;
}

export class Page extends React.Component<IPageProps, undefined> {
  public props: IPageProps;

  render(): ReactNode {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link rel="stylesheet" type="text/css" href={this.props.siteGenerator.generateUrl('static/css/index.css')} />
        </head>
        <body>
          {this.props.bodyNodes}
        </body>
      </html>
    );
  }
}