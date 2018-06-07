/// <reference types="react" />
import * as React from 'react';
export interface Coordinate {
    x: number;
    y: number;
}
export interface Props {
    xs: any[];
    ys: any[];
    verticalBorders?: string[];
    horizontalBorders?: string[];
    onClick?: (x: any, y: any) => void;
    onHover?: (coordinate: Coordinate | null) => void;
}
/**
 * Cells can be placed inside a Frame to create vertical and horizontal gridlines. It acts as a
 * background layer, and does not render children.
 */
declare const Cells: React.SFC<Props>;
export default Cells;
