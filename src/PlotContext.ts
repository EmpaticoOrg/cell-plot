export interface PlotContext {
  gridXMin: number;
  gridXMax: number;
  gridXStep: number;
  gridXRange: number;
  gridYMin: number;
  gridYMax: number;
  gridYStep: number;
  gridYRange: number;
}

const fakePropType: any = () => null;
export const PlotContextProps = {
  gridXMin: fakePropType,
  gridXMax: fakePropType,
  gridXStep: fakePropType,
  gridXRange: fakePropType,
  gridYMin: fakePropType,
  gridYMax: fakePropType,
  gridYStep: fakePropType,
  gridYRange: fakePropType
};
