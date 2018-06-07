/// <reference types="react" />
import * as React from 'react';
import { PlotContext } from './PlotContext';
export interface Props {
    x: number;
    y: number;
    width: number | string;
    height: number | string;
    onHover?: (hovering: boolean) => void;
    innerRef?: (element: HTMLDivElement) => void;
}
export default class Rectangle extends React.Component<Props & React.HTMLAttributes<HTMLDivElement>> {
    static contextTypes: {
        gridXMin: any;
        gridXMax: any;
        gridXStep: any;
        gridXRange: any;
        gridYMin: any;
        gridYMax: any;
        gridYStep: any;
        gridYRange: any;
    };
    context: PlotContext;
    render(): JSX.Element;
}
