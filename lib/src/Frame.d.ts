/// <reference types="react" />
import * as React from 'react';
export interface Props {
    innerRef: (el: HTMLDivElement) => void;
    xLabels: React.ReactNode[];
    yLabels: React.ReactNode[];
    verticalBorder: undefined | string;
    horizontalBorder: undefined | string;
}
/**
 * Frame provides axis labeling, and renders its children within a positionable space.
 */
declare const Frame: React.SFC<Props>;
export default Frame;
