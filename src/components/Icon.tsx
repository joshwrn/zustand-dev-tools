import type { FC } from 'react';

import styled from 'styled-components';

import { GiPolarBear } from 'react-icons/gi';

import { useZ } from '../state/store';

const RecoilIcon = styled.button<{
  toolsAreOpen: boolean;
}>`
  border: none;
  height: 40px;
  width: 40px;
  position: fixed;
  left: 8px;
  bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2147483647;
  pointer-events: all;
  border-radius: 50%;
  background: #44444450;
  backdrop-filter: blur(30px);
  transition: opacity 0.2s, transform 0.2s;
  border-top: 1px solid #ffffff1a;
  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }
  svg {
    width: 30px;
    height: 30px;
    path {
      fill: #bababa;
    }
  }
`;

const DevToolsIcon: FC = () => {
  const state = useZ(['devToolsOpen', 'setDevToolsOpen']);
  return (
    <RecoilIcon
      type="button"
      onClick={() => state.setDevToolsOpen(!state.devToolsOpen)}
      toolsAreOpen={state.devToolsOpen}
    >
      <GiPolarBear size={30} />
    </RecoilIcon>
  );
};

export default DevToolsIcon;
