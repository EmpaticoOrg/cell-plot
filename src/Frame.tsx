import * as React from 'react';
import styled from 'styled-components';

export interface Props {
  innerRef: (el: HTMLDivElement) => void;
  xLabels: React.ReactNode[];
  yLabels: React.ReactNode[];
  verticalBorder: undefined | string;
  horizontalBorder: undefined | string;
}

const Rows = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const Columns = styled.div`
  display: flex;
  flex-direction: column;
`;

const XLabel = styled.div`
  display: flex;
  flex: 1 1 1px;
`;

const YLabel = styled.div`
  display: flex;
  flex: 1 1 auto;
`;

const Fill = YLabel;

const StyledSpacer = styled.div`
  visibility: hidden;
  overflow-x: hidden;
  width: 1px;
`;

/**
 * Frame provides axis labeling, and renders its children within a positionable space.
 */
const Frame: React.SFC<Props> = (props) => {
  return (
    <Rows style={{flex: '1 1 auto'}}>
      <Columns>
        <StyledSpacer>{props.xLabels[0]}</StyledSpacer>
        {props.yLabels.map((label, idx) =>
          <YLabel key={idx}>{label}</YLabel>
        )}
      </Columns>
      <Fill>
        <Columns style={{flex: '1 1 auto'}}>
          <Rows>
            {props.xLabels.map((label, idx) =>
              <XLabel key={idx}>{label}</XLabel>
            )}
          </Rows>
          <Fill style={{
            borderTop: props.verticalBorder,
            borderBottom: props.verticalBorder,
            borderLeft: props.horizontalBorder,
            borderRight: props.horizontalBorder
          }}>
            <div
              style={{position: 'relative', flex: '1 1 auto'}}
              ref={props.innerRef}>
              {props.children}
            </div>
          </Fill>
        </Columns>
      </Fill>
    </Rows>
  );
};

export default Frame;
