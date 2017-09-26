export interface PlotConsumer {
  yAt: (pxY: number) => number;
  xAt: (pxX: number) => number;
}

const fakePropType: any = () => null;
export const PlotConsumerProps = {
  yAt: fakePropType,
  xAt: fakePropType
};
