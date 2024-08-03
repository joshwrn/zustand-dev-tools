import React from 'react';
import { DraggableCore } from 'react-draggable';
import { useZ } from '../state/store';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  border: 1px solid ${({ theme }) => theme.faintOutline};
  border-radius: 6px;
  overflow: hidden;
`;

export const DraggableContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const nodeRef = React.useRef<HTMLDivElement>(null);
  const state = useZ(['position', 'setState']);
  return (
    <DraggableCore
      onDrag={(e, data) => {
        state.setState((draft) => {
          draft.position.x += data.deltaX;
          draft.position.y += data.deltaY;
          if (draft.position.y < 0) draft.position.y = 0;
        });
      }}
      handle=".handle"
      nodeRef={nodeRef}
      disabled={false}
    >
      <Wrapper
        ref={nodeRef}
        style={{
          top: state.position.y,
          left: state.position.x,
        }}
      >
        {children}
      </Wrapper>
    </DraggableCore>
  );
};
