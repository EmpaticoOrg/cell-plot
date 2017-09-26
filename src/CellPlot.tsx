import * as React from 'react';

import Frame from './Frame';
import Cells from './Cells';
import {PlotContext, PlotContextProps} from './PlotContext';
import {PlotConsumer, PlotConsumerProps} from './PlotConsumer';

export interface Props {
  xLabels: React.ReactNode[];
  xBorders?: string[]; // a cyclic sequence of strings for the css border property
  xs: number[];

  yLabels: React.ReactNode[];
  yBorders?: string[]; // a cyclic sequence of strings for the css border property
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
 * CellPlot is a block-level structure that acts like a hybrid of a table and a graph. It makes the
 * following assumptions:
 *
 * 1. The x and y values proceed in regular increments.
 * 2. The x and y axes are numeric, but not continuous. They proceed in finite steps with no
 *    intermediate values.
 * 3. Not every x and y value is labeled, but the quantity of x and y values are some multiple of
 *    the quantity of x and y labels.
 * 4. The lowest x and y values are in the top left corner.
 *
 * Using these assumptions, it will lay out labels and grid lines useful for placing positioned
 * child elements. The children exist in a relative positioning container, and should access the
 * PlotContext for variables needed to calculate their position.
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
        yLabels={this.props.yLabels}>

        <Cells
          xs={this.props.xs}
          xBorders={this.props.xBorders}
          ys={this.props.ys}
          yBorders={this.props.yBorders}
          onClick={this.props.onClick} />

        {this.props.children}
      </Frame>
    );
  }
}
