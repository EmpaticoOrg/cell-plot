import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {number} from '@storybook/addon-knobs';
import styled from 'styled-components';

import CellPlot, {Rectangle, Coordinate} from '../src';

const teal = '#58A9A3';
const gold = '#CEB471';
const blue = '#53697D';
const red = '#F7846B';
const highlight = '#DDDD00';

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
  margin-right: 1px;
  margin-bottom: 1px;
  color: white;
  opacity: 0.8;
`;

function rangeToArray(r: [number, number]): number[] {
  return Array(r[1] - r[0] + 1).fill(0).map((_, idx) => idx + r[0]);
}

interface DemoProps {
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
}

interface DemoState {
  cellHover: Coordinate | null;
  rectangleHoverEast: boolean;
  rectangleHoverWest: boolean;
  rectangleHoverNorth: boolean;
  rectangleHoverSouth: boolean;
}

class Demo extends React.Component<DemoProps, DemoState> {
  constructor(props: DemoProps) {
    super(props);

    this.state = {
      cellHover: null,
      rectangleHoverEast: false,
      rectangleHoverWest: false,
      rectangleHoverNorth: false,
      rectangleHoverSouth: false
    };
  }

  render() {
    return <Container>
      <CellPlot
        xLabels={[<XLabel>left</XLabel>, <XLabel>center</XLabel>, <XLabel>right</XLabel>]}
        yLabels={[<YLabel>top</YLabel>, <YLabel>center</YLabel>, <YLabel>bottom</YLabel>]}
        xs={rangeToArray([this.props.xMin, this.props.xMax])}
        ys={rangeToArray([this.props.yMin, this.props.yMax])}
        verticalBorders={['1px solid #555', '1px dotted #ccc']}
        horizontalBorders={['1px solid #555', '1px dotted #ccc']}
        onClick={action('onClick')}
        onHover={(coord) => this.setState({cellHover: coord})}>

        {this.state.cellHover &&
          <Rectangle style={{zIndex: 1, pointerEvents: 'none'}} x={this.state.cellHover.x} y={this.state.cellHover.y} width={1} height={1}>
            <Box style={{backgroundColor: highlight}}></Box>
          </Rectangle>
        }

        <Rectangle x={5} y={3} width={2} height={2} onHover={(hovering: boolean) => this.setState({rectangleHoverEast: hovering})}>
          <Box style={{backgroundColor: this.state.rectangleHoverEast ? highlight : teal}}>
            East
          </Box>
        </Rectangle>
        <Rectangle x={3} y={5} width={2} height={2} onHover={(hovering: boolean) => this.setState({rectangleHoverSouth: hovering})}>
          <Box style={{backgroundColor: this.state.rectangleHoverSouth ? highlight : red}}>
            South
          </Box>
        </Rectangle>
        <Rectangle x={1} y={3} width={2} height={2} onHover={(hovering: boolean) => this.setState({rectangleHoverWest: hovering})}>
          <Box style={{backgroundColor: this.state.rectangleHoverWest ? highlight : gold}}>
            West
          </Box>
        </Rectangle>
        <Rectangle x={3} y={1} width={2} height={2} onHover={(hovering: boolean) => this.setState({rectangleHoverNorth: hovering})}>
          <Box style={{backgroundColor: this.state.rectangleHoverNorth ? highlight : blue}}>
            North
          </Box>
        </Rectangle>
      </CellPlot>
    </Container>;
  }
}

storiesOf('CellPlot', module)
  .add('Grid', () => {
    return <Demo
      xMin={number('xMin', 1, {range: true, min: 0, max: 5, step: 1})}
      yMin={number('yMin', 1, {range: true, min: 0, max: 5, step: 1})}
      xMax={number('xMax', 6, {range: true, min: 6, max: 20, step: 1})}
      yMax={number('yMax', 6, {range: true, min: 6, max: 20, step: 1})}
    />;
  });
