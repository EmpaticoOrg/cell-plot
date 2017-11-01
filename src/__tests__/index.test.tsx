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

describe('layout calculations', () => {
  test('too far above', () => {
    const component = renderer.create(
      <CellPlot xs={[3, 4]} ys={[5, 6]}>
        <Rectangle x={3} y={4} width={1} height={1} />
      </CellPlot>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('too far right', () => {
    const component = renderer.create(
      <CellPlot xs={[3, 4]} ys={[5, 6]}>
        <Rectangle x={5} y={5} width={1} height={1} />
      </CellPlot>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('too far below', () => {
    const component = renderer.create(
      <CellPlot xs={[3, 4]} ys={[5, 6]}>
        <Rectangle x={3} y={7} width={1} height={1} />
      </CellPlot>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('too far left', () => {
    const component = renderer.create(
      <CellPlot xs={[3, 4]} ys={[5, 6]}>
        <Rectangle x={2} y={5} width={1} height={1} />
      </CellPlot>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('clamped by top boundary', () => {
    const component = renderer.create(
      <CellPlot xs={[3, 4]} ys={[5, 6]}>
        <Rectangle x={3} y={4} width={2} height={2} />
      </CellPlot>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('clamped by right boundary', () => {
    const component = renderer.create(
      <CellPlot xs={[3, 4]} ys={[5, 6]}>
        <Rectangle x={4} y={5} width={2} height={2} />
      </CellPlot>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('clamped by bottom boundary', () => {
    const component = renderer.create(
      <CellPlot xs={[3, 4]} ys={[5, 6]}>
        <Rectangle x={3} y={6} width={2} height={2} />
      </CellPlot>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('clamped by left boundary', () => {
    const component = renderer.create(
      <CellPlot xs={[3, 4]} ys={[5, 6]}>
        <Rectangle x={2} y={5} width={2} height={2} />
      </CellPlot>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

});
