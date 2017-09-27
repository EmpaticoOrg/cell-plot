import * as React from 'react';

import Frame from './Frame';
import Cells from './Cells';
import {PlotContext, PlotContextProps} from './PlotContext';
import {PlotConsumer, PlotConsumerProps} from './PlotConsumer';

export interface Props {
  xLabels: React.ReactNode[];
  verticalBorders?: string[]; // a cyclic sequence of strings for the css border property
  xs: number[];

  yLabels: React.ReactNode[];
  horizontalBorders?: string[]; // a cyclic sequence of strings for the css border property
  ys: number[];

  onClick?: (x: number, y: number) => void;
}

function snap(value: number, interval: number): number {
  const excess = value % interval;
  if (excess >= 0.5 * interval) {
    return value + interval - excess;
  } else {
    return value - excess;
  }
}

function clamp(value: number, {min, max}: {min: number, max: number}): number {
  return Math.max(Math.min(value, max), min);
}

/**
 * Creates optionally clickable cells and a plottable coordinate plane.
 */
export default class CellPlot extends React.Component<Props> {
  static childContextTypes = {...PlotContextProps, ...PlotConsumerProps};
  el: HTMLElement;

  getChildContext(): PlotContext & PlotConsumer {
    return {
      gridXMin: this.props.xs[0],
      gridXUnits: this.props.xs.length,
      gridXStep: this.props.xs[1] ? this.props.xs[1] - this.props.xs[0] : 1,
      gridYMin: this.props.ys[0],
      gridYUnits: this.props.ys.length,
      gridYStep: this.props.ys[1] ? this.props.ys[1] - this.props.ys[0] : 1,
      yAt: this.yAt.bind(this),
      xAt: this.xAt.bind(this)
    };
  }

  /**
   * Converts pixel units to whatever unit the grid is in. Exposed through the PlotConsumer context.
   */
  yAt(pxY: number): number {
    const yMax = this.props.ys[this.props.ys.length - 1];
    const yMin = this.props.ys[0];
    const yStep = this.props.ys[1] - this.props.ys[0];
    const yRange = yMax - yMin + 1;
    const pxPerY = this.el.offsetHeight / yRange;

    return Math.round(clamp(snap(pxY / pxPerY + yMin, yStep), {min: yMin, max: yMax + yStep}));
  }

  /**
   * Converts pixel units to whatever unit the grid is in. Exposed through the PlotConsumer context.
   */
  xAt(pxX: number): number {
    const xMax = this.props.xs[this.props.xs.length - 1];
    const xMin = this.props.xs[0];
    const xStep = this.props.xs[1] - this.props.xs[0];
    const xRange = xMax - xMin + 1;
    const pxPerX = this.el.offsetWidth / xRange;

    return Math.round(clamp(snap(pxX / pxPerX + xMin, xStep), {min: xMin, max: xMax}));
  }

  render() {
    return (
      <Frame
        innerRef={(el) => this.el = el}
        xLabels={this.props.xLabels}
        yLabels={this.props.yLabels}
        verticalBorder={this.props.verticalBorders && this.props.verticalBorders[0]}
        horizontalBorder={this.props.horizontalBorders && this.props.horizontalBorders[0]}>

        <Cells
          xs={this.props.xs}
          verticalBorders={this.props.verticalBorders}
          ys={this.props.ys}
          horizontalBorders={this.props.horizontalBorders}
          onClick={this.props.onClick} />

        {this.props.children}
      </Frame>
    );
  }
}
