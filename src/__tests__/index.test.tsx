import * as React from 'react';
import * as renderer from 'react-test-renderer';

import CellPlot, {Rectangle} from '../index';

test('static render', () => {
  const component = renderer.create(
    <CellPlot
      xLabels={['x0', 'x1', 'x2']}
      yLabels={['y0', 'y1', 'y2']}
      xs={[-1, 0, 1]}
      ys={[-1, 0, 1]}>
      <Rectangle x={1} y={0} width={1} height={1} />
      <Rectangle x={0} y={1} width={1} height={1} />
      <Rectangle x={-1} y={0} width={1} height={1} />
      <Rectangle x={0} y={-1} width={1} height={1} />
    </CellPlot>
  );

  expect(component.toJSON()).toMatchSnapshot();
});
