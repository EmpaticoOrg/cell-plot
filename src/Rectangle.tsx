import * as React from 'react';
import styled from 'styled-components';

import {PlotContext, PlotContextProps} from './PlotContext';

export interface Props {
  x: number;
  y: number;
  width: number | string;
  height: number | string;
}

const Container = styled.div`
  pointer-events: auto;
  position: absolute;
`;

export default class Rectangle extends React.Component<Props & React.HTMLAttributes<HTMLDivElement>> {
  static contextTypes = PlotContextProps;
  context: PlotContext;

  top(): string {
    const yCount = (this.context.gridYUnits * this.context.gridYStep);
    const top = (this.props.y - this.context.gridYMin) / yCount;
    return `${top * 100}%`;
  }

  left(): string {
    const xCount = (this.context.gridXUnits * this.context.gridXStep);
    const left = (this.props.x - this.context.gridXMin) / xCount;
    return `${left * 100}%`;
  }

  height(): string {
    if (typeof this.props.height === 'string') {
      return this.props.height;
    } else {
      const yCount = (this.context.gridYUnits * this.context.gridYStep);
      const pct = this.props.height / yCount;
      return `${pct * 100}%`;
    }
  }

  width(): string {
    if (typeof this.props.width === 'string') {
      return this.props.width;
    } else {
      const xCount = (this.context.gridXUnits * this.context.gridXStep);
      const pct = this.props.width / xCount;
      return `${pct * 100}%`;
    }
  }

  render() {
    const {x, y, height, width, style, ...remaining} = this.props;
    x; y; height; width; // tslint:disable-line

    // provided styles override calculated styles. power to the people!
    const mergedStyles = {
      width: this.width(),
      height: this.height(),
      top: this.top(),
      left: this.left(),
      ...style
    };
    return <Container {...remaining} style={mergedStyles} />;
  }
}
