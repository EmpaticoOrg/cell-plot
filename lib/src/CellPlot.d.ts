/// <reference types="react" />
import * as React from 'react';
import { Coordinate } from './Cells';
import { PlotContext } from './PlotContext';
import { PlotConsumer } from './PlotConsumer';
export interface Props {
    xLabels?: React.ReactNode[];
    verticalBorders?: string[];
    xs: number[];
    yLabels?: React.ReactNode[];
    horizontalBorders?: string[];
    ys: number[];
    onClick?: (x: number, y: number) => void;
    onHover?: (coordinate: Coordinate) => void;
}
/**
 * Creates optionally clickable cells and a plottable coordinate plane.
 */
export default class CellPlot extends React.Component<Props> {
    static childContextTypes: {
        yAt: any;
        xAt: any;
        gridXMin: any;
        gridXMax: any;
        gridXStep: any;
        gridXRange: any;
        gridYMin: any;
        gridYMax: any;
        gridYStep: any;
        gridYRange: any;
    };
    el: HTMLElement;
    getChildContext(): PlotContext & PlotConsumer;
    render(): JSX.Element;
}
