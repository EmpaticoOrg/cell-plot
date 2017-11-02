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

function pct(decimal: number): string {
  return `${decimal * 100}%`;
}

export default class Rectangle extends React.Component<Props & React.HTMLAttributes<HTMLDivElement>> {
  static contextTypes = PlotContextProps;
  context: PlotContext;

  render() {
    const {x, y, height, width, style, ...remaining} = this.props;

    // invisible, don't render
    if (
      x > this.context.gridXMax ||
      y > this.context.gridYMax ||
      x + (typeof width === 'string' ? 0 : width) <= this.context.gridXMin ||
      y + (typeof height === 'string' ? 0 : height) <= this.context.gridYMin
    ) {
      return <span />;
    }

    // calculate clamped coordinates
    const left = Math.max(x, this.context.gridXMin);
    const right = typeof width === 'string' ? x : Math.min(x + width, this.context.gridXMax + this.context.gridXStep);
    const top = Math.max(y, this.context.gridYMin);
    const bottom = typeof height === 'string' ? y : Math.min(y + height, this.context.gridYMax + this.context.gridYStep);

    // layout styles
    const layout = {
      top: pct((top - this.context.gridYMin) / this.context.gridYRange),
      left: pct((left - this.context.gridXMin) / this.context.gridXRange),
      height: typeof height === 'string'
        ? height
        : pct(Math.min(1, (bottom - top) / this.context.gridYRange)),
      width: typeof width === 'string'
        ? width
        : pct(Math.min(1, (right - left) / this.context.gridXRange))
    };

    // provided styles override calculated styles.
    return <Container {...remaining} style={{...layout, ...style}} />;
  }
}
