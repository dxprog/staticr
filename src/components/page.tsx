import * as React from 'react';
import { ReactNode, ReactElement } from 'react';

interface Props {
  title: string;
  bodyNodes: Array<ReactNode> | ReactElement<any>;
}

export default class Post extends React.Component<Props, undefined> {
  public props: Props;

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