import * as React from 'react';

import Frame from './Frame';
import Cells from './Cells';
import {PlotContext, PlotContextProps} from './PlotContext';
import {PlotConsumer, PlotConsumerProps} from './PlotConsumer';

export interface Props {
  xLabels?: React.ReactNode[];
  verticalBorders?: string[]; // a cyclic sequence of strings for the css border property
  xs: number[];

  yLabels?: React.ReactNode[];
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
    const gridYMin = this.props.ys[0];
    const gridYMax = this.props.ys[this.props.ys.length - 1];
    const gridYStep = this.props.ys[1] ? this.props.ys[1] - gridYMin : 1;
    const gridYRange = gridYMax - gridYMin + gridYStep;

    const gridXMin = this.props.xs[0];
    const gridXMax = this.props.xs[this.props.xs.length - 1];
    const gridXStep = this.props.xs[1] ? this.props.xs[1] - gridXMin : 1;
    const gridXRange = gridXMax - gridXMin + gridXStep;

    return {
      gridXMin,
      gridXMax,
      gridXStep,
      gridXRange: gridXMax - gridXMin + gridXStep,
      gridYMin,
      gridYMax,
      gridYStep,
      gridYRange: gridYMax - gridYMin + gridYStep,
      yAt: (pxY: number): number => {
        const pxPerY = this.el.offsetHeight / gridYRange;
        return Math.round(
          clamp(
            snap(pxY / pxPerY + gridYMin, gridYStep),
            {min: gridYMin, max: gridYMax + gridYStep}
          )
        );
      },
      xAt: (pxX: number): number => {
        const pxPerX = this.el.offsetWidth / gridXRange;
        return Math.round(
          clamp(
            snap(pxX / pxPerX + gridXMin, gridXStep),
            {min: gridXMin, max: gridXMax + gridXStep}
          )
        );
      }
    };
  }

  render() {
    return (
      <Frame
        innerRef={(el) => this.el = el}
        xLabels={this.props.xLabels || []}
        yLabels={this.props.yLabels || []}
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
