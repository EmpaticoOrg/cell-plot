import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {number} from '@storybook/addon-knobs';
import styled from 'styled-components';

import CellPlot, {Rectangle} from '../src';

const teal = '#58A9A3';
const gold = '#CEB471';
const blue = '#53697D';
const red = '#F7846B';

const Container = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  margin: 10px;
`;

const Centered = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
`;

const XLabel = Centered.extend`
  margin-bottom: 5px;
`;

const YLabel = Centered.extend`
  justify-content: flex-end;
  margin-right: 5px;
`;

const Box = Centered.extend`
  height: calc(100% - 1px);
  width: calc(100% - 1px);
  margin: auto;
  color: white;
  opacity: 0.8;
`;

function rangeToArray(r: [number, number]): number[] {
  return Array(r[1] - r[0] + 1).fill(0).map((_, idx) => idx + r[0]);
}

storiesOf('CellPlot', module)
  .add('Grid', () => {
    const xMax = number('xMax', 6, {range: true, min: 6, max: 20, step: 1});
    const yMax = number('yMax', 6, {range: true, min: 6, max: 20, step: 1});

    return <Container>
      <CellPlot
        xLabels={[<XLabel>left</XLabel>, <XLabel>center</XLabel>, <XLabel>right</XLabel>]}
        yLabels={[<YLabel>top</YLabel>, <YLabel>center</YLabel>, <YLabel>bottom</YLabel>]}
        xs={rangeToArray([1, xMax])}
        ys={rangeToArray([1, yMax])}
        verticalBorders={['1px solid #555', '1px dotted #ccc']}
        horizontalBorders={['1px solid #555', '1px dotted #ccc']}
        onClick={action('onClick')}>

        <Rectangle x={5} y={3} width={2} height={2}>
          <Box style={{backgroundColor: teal}}>East</Box>
        </Rectangle>
        <Rectangle x={3} y={5} width={2} height={2}>
          <Box style={{backgroundColor: red}}>South</Box>
        </Rectangle>
        <Rectangle x={1} y={3} width={2} height={2}>
          <Box style={{backgroundColor: gold}}>West</Box>
        </Rectangle>
        <Rectangle x={3} y={1} width={2} height={2}>
          <Box style={{backgroundColor: blue}}>North</Box>
        </Rectangle>
      </CellPlot>
    </Container>;
  });
