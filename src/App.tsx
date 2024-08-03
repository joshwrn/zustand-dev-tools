import type { FC } from 'react';

import styled, { ThemeProvider } from 'styled-components';

import DevtoolsHeader from './components/Header';
import List from './components/List';
import { globalStyle } from './styles/globalStyle';
import { devThemes } from './styles/themes';
import { numberToHex } from './utils/color';
import { DraggableContainer } from './components/DraggableContainer';
import { useZ } from './state/store';
import SettingsPage from './components/Settings';

export const Tools: FC<{
  state: any;
  setShowDevTools?: (show: boolean) => void;
}> = ({ state, setShowDevTools }) => {
  const s = useZ([
    'transparency',
    'position',
    'settingsOpen',
    'width',
    'theme',
    'fonts',
    'fontSize',
  ]);

  return (
    <ThemeProvider theme={devThemes[s.theme] ?? devThemes[`Light`]}>
      <DraggableContainer>
        <Backdrop transparency={s.transparency} />
        <Layer fonts={s.fonts} fontSize={s.fontSize}>
          <DevtoolsHeader setShowDevTools={setShowDevTools} />
          <Inner width={s.width}>
            <List state={state} />
          </Inner>
          {s.settingsOpen && <SettingsPage />}
        </Layer>
      </DraggableContainer>
    </ThemeProvider>
  );
};

const Backdrop = styled.div<{ transparency: number }>`
  position: absolute;
  top: 0;
  left: 0;
  background: ${({ theme, transparency }) =>
    `${theme.background}${numberToHex(transparency)}`};
  backdrop-filter: blur(30px);
  pointer-events: none;
  z-index: 0;
  height: 100%;
  width: 100%;
`;
const Layer = styled.div<{ fonts: string; fontSize: number }>`
  ${globalStyle}
  * {
    font-family: ${({ fonts }) => (fonts.length > 0 ? fonts + `,` : ``)}
        'Jetbrains Mono',
      'Dank Mono', 'Courier New', Courier, monospace !important;
    font-size: ${({ fontSize }) => fontSize}px;
    i {
      font-family: Icon !important;
      font-variation-settings: 'wght' 250;
    }
  }
  .devtools-badge {
    display: inline-block;
    transform: translateY(-1px);
    margin-right: 5px;
    position: relative;
    font-size: ${({ fontSize }) => fontSize / 2 + 2}px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20001;
  width: 100%;
`;
const Inner = styled.div<{ width: number }>`
  overflow-y: overlay;
  overflow-x: overlay;
  width: 100%;
  width: ${({ width }) => width}px;
  position: relative;
  height: calc(100vh - 60px);
  padding-top: 60px;
  padding-left: 5px;
  top: 0;
  user-select: none;
`;
