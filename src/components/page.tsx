import * as React from 'react';
import { ReactNode, ReactElement } from 'react';

export interface IPageProps {
  title: string;
  bodyNodes: Array<ReactNode> | ReactElement<any>;
}

export class Page extends React.Component<IPageProps, undefined> {
  public props: IPageProps;

  render(): ReactNode {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link rel="stylesheet" type="text/css" href="static/css/index.css" />
        </head>
        <body>
          {this.props.bodyNodes}
        </body>
      </html>
    );
  }
}