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
        </head>
        <body>
          {this.props.bodyNodes}
        </body>
      </html>
    );
  }
}