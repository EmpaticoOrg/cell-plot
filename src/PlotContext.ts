export interface PlotContext {
  gridXMin: number;
  gridXUnits: number;
  gridXStep: number;
  gridYMin: number;
  gridYUnits: number;
  gridYStep: number;
}

const fakePropType: any = () => null;
export const PlotContextProps = {
  gridXMin: fakePropType,
  gridXUnits: fakePropType,
  gridXStep: fakePropType,
  gridYMin: fakePropType,
  gridYUnits: fakePropType,
  gridYStep: fakePropType,
};
