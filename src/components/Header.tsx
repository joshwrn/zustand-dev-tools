import type { FC } from 'react';
import React from 'react';

import { BiDotsVerticalRounded as DotsIcon } from 'react-icons/bi';
import { GrSettingsOption as SettingsIcon } from 'react-icons/gr';
import { IoCloseSharp as CloseIcon } from 'react-icons/io5';
import styled from 'styled-components';

import { useOutsideClick } from '../hooks/useOutsideClick';
import { numberToHex } from '../utils/color';
import { useZ } from '../state/store';
import QuickMenu from './QuickMenu';

const Header = styled.div<{ headerTransparency: number; fontSize: number }>`
  box-sizing: border-box;
  position: absolute;
  height: 40px;
  top: 0px;
  left: 0;
  width: 100%;
  z-index: 20002;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: ${({ theme, headerTransparency }) =>
    theme.headerBackground + numberToHex(headerTransparency)};
  backdrop-filter: blur(30px);
  padding: 30px 10px;
  input {
    box-sizing: border-box;
    flex-shrink: 0;
    height: 40px;
    width: calc(100% - 125px);
    padding: 5px 15px;
    border: 1px solid ${({ theme }) => theme.faintOutline};
    background: none;
    border-radius: 7px;
    font-size: 20px;
    color: ${({ theme }) => theme.text};
    font-size: 14px !important;
    ::placeholder {
      color: ${({ theme }) => theme.faintText};
    }
  }
`;
export const Icon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 50%;
  /* #ffffff52 */
  background-color: ${({ theme }) => theme.iconBackground}52;
  color: ${({ theme }) => theme.faintText};
  i {
    font-size: 14px !important;
    transform: translate(0.5px, 1px);
  }
  :hover {
    background-color: ${({ theme }) => theme.iconBackground}e6;
  }
  path {
    stroke: ${({ theme }) => theme.faintText};
  }
`;

const DevtoolsHeader: FC<{
  setShowDevTools?: (show: boolean) => void;
}> = ({ setShowDevTools }) => {
  const state = useZ([
    'isQuickMenuOpen',
    'setState',
    'fontSize',
    'userInput',
    'setUserInput',
    'setDevToolsOpen',
  ]);

  const ref = useOutsideClick(() =>
    state.setState((draft) => {
      draft.isQuickMenuOpen = false;
    })
  ) as React.RefObject<HTMLDivElement>;

  return (
    <Header headerTransparency={1} fontSize={state.fontSize} className="handle">
      <input
        value={state.userInput}
        onChange={(e) => state.setUserInput(e.target.value.toLowerCase())}
        placeholder="Search"
      />
      <div style={{ position: `relative` }} ref={ref}>
        <Icon
          onClick={() =>
            state.setState((draft) => {
              draft.isQuickMenuOpen = !draft.isQuickMenuOpen;
            })
          }
          title="Quick Options"
        >
          <DotsIcon style={{ transform: `translate(.5px, 0)` }} size={19} />
        </Icon>
        {state.isQuickMenuOpen && <QuickMenu />}
      </div>
      <Icon
        title="Settings"
        onClick={() =>
          state.setState((draft) => {
            draft.settingsOpen = !draft.settingsOpen;
          })
        }
      >
        <SettingsIcon style={{ transform: `translate(.5px, 0)` }} size={19} />
      </Icon>
      <Icon
        title="Close"
        onClick={() => (state.setDevToolsOpen(false), setShowDevTools?.(false))}
      >
        <CloseIcon style={{ transform: `translate(.5px, 0)` }} size={19} />
      </Icon>
    </Header>
  );
};

export default DevtoolsHeader;
