import * as React from 'react';
import styled from 'styled-components';

export interface Props {
  xs: any[];
  xBorders?: string[];
  ys: any[];
  yBorders?: string[];
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
const Cells: React.SFC<Props> = (props) => {
  const xBorders = props.xBorders || [];
  const yBorders = props.yBorders || [];

  return (
    <Columns>
      {props.xs.map((x, idx) => (
        <Column
          key={x}
          style={{
            borderRight: (idx !== props.xs.length - 1 ? xBorders[(idx + 1) % xBorders.length] : null)
          }}>
          {props.ys.map((y, idy) => (
            <Cell
              key={y}
              onClick={() => props.onClick && props.onClick(x, y)}
              style={{
                borderBottom: (idy !== props.ys.length - 1 ? yBorders[(idy + 1) % yBorders.length] : null)
              }} />
          ))}
        </Column>
      ))}
    </Columns>
  );
};
export default Cells;
