import * as React from 'react';

import Frame from './Frame';
import Cells, {Coordinate} from './Cells';
import {PlotContext, PlotContextProps} from './PlotContext';
import {PlotConsumer, PlotConsumerProps} from './PlotConsumer';
import {convertCoordinate} from './util';

export interface Props {
  xLabels?: React.ReactNode[];
  verticalBorders?: string[]; // a cyclic sequence of strings for the css border property
  xs: number[];

  yLabels?: React.ReactNode[];
  horizontalBorders?: string[]; // a cyclic sequence of strings for the css border property
  ys: number[];

  onClick?: (x: number, y: number) => void; // TODO: convert to Coordinate in 2.x release
  onHover?: (coordinate: Coordinate) => void;
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
        return convertCoordinate(pxY / pxPerY, {min: gridYMin, max: gridYMax, interval: gridYStep});
      },
      xAt: (pxX: number): number => {
        const pxPerX = this.el.offsetWidth / gridXRange;
        return convertCoordinate(pxX / pxPerX, {min: gridXMin, max: gridXMax, interval: gridXStep});
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
          onClick={this.props.onClick}
          onHover={this.props.onHover} />

        {this.props.children}
      </Frame>
    );
  }
}
