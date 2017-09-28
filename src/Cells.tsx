import * as React from 'react';
import styled from 'styled-components';

export interface Props {
  xs: any[];
  ys: any[];
  verticalBorders?: string[];
  horizontalBorders?: string[];
  onClick?: (x: any, y: any) => void;
}

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

const Cell = styled.div`
  flex: 1 1 auto;
`;

/**
 * Cells can be placed inside a Frame to create vertical and horizontal gridlines. It acts as a
 * background layer, and does not render children.
 */
const Cells: React.SFC<Props> = ({xs, ys, verticalBorders, horizontalBorders, onClick}) => {
  return (
    <Columns>
      {xs.map((x, idx) => (
        <Column
          key={x}
          style={{
            borderRight: verticalBorders && verticalBorders[(idx + 1) % verticalBorders.length]
          }}>
          {ys.map((y, idy) => (
            <Cell
              key={y}
              onClick={() => onClick && onClick(x, y)}
              style={{
                borderBottom: horizontalBorders && horizontalBorders[(idy + 1) % horizontalBorders.length]
              }} />
          ))}
        </Column>
      ))}
    </Columns>
  );
};
Cells.defaultProps = {
  verticalBorders: [],
  horizontalBorders: []
};

export default Cells;
