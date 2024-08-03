import type { FC } from "react"

import styled from "styled-components"
import { IoCloseSharp as CloseIcon } from "react-icons/io5"

import { devThemes } from "../styles/themes"
import { useZ } from "../state/store"
import { Icon } from "./Header"

const Container = styled.div<{
  fontSize: number
}>`
  * {
    font-size: 14px !important;
  }
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  backdrop-filter: blur(30px);
  z-index: 20001;
  border-top: 1px solid ${({ theme }) => theme.faintOutline} !important;
  flex-direction: column;
  width: 100%;
  padding: 0 20px;
  align-items: flex-start;
  overflow: auto;
  gap: 20px;
  .devSettingsTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.faintOutline};
    padding: 15px 0;
    p {
      font-weight: 500;
      color: ${({ theme }) => theme.faintText};
    }
    svg {
      width: ${({ fontSize }) => fontSize}px;
      height: ${({ fontSize }) => fontSize}px;
    }
    path {
      fill: ${({ theme }) => theme.faintText};
    }
    button {
      svg {
        width: 19px !important;
        height: 19px !important;
      }
    }
  }
`
const Option = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px dashed ${({ theme }) => theme.faintOutline};
  height: 40px;
  label {
    font-weight: 700;
    color: ${({ theme }) => theme.faintText};
  }
  select {
    color: ${({ theme }) => theme.faintText};
    font-weight: 600;
    cursor: pointer;
    padding-bottom: 5px;
  }
  option {
    background: ${({ theme }) => theme.background};
  }
  input,
  select {
    width: 50%;
    max-width: 400px;
    min-width: 135px;
    background: none;
  }
  input[type="range"] {
    cursor: pointer;
    -webkit-appearance: none;
    border-radius: 20px;
    background: ${({ theme }) => theme.faintOutline};
    outline: 1px solid ${({ theme }) => theme.faintText}40;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    height: 15px;
    ::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: ${({ theme }) => theme.primaryText};
      cursor: pointer;
    }
    &:disabled {
      cursor: not-allowed;
      ::-webkit-slider-thumb {
        cursor: not-allowed;
        background: ${({ theme }) => theme.faintText};
      }
    }
  }
  input[type="text"],
  input[type="number"] {
    padding-left: 5px;
    color: ${({ theme }) => theme.faintText};
    font-weight: 600;
    padding-bottom: 5px;
    ::placeholder {
      color: ${({ theme }) => theme.faintText};
    }
  }
`

export interface DevToolSettings {
  position: string
  transparency: number
  theme: string
  width: number
  height: number
  vibrancy: number
  fonts: string
  fontSize: number
}

const SettingsPage: FC = () => {
  const { theme, transparency, fonts, fontSize, setSettingsOpen, setState } =
    useZ([
      "position",
      "theme",
      "transparency",
      "fonts",
      "fontSize",
      "setSettingsOpen",
      "setState",
    ])

  return (
    <Container fontSize={fontSize}>
      <div className="devSettingsTop">
        <p>Settings</p>
        <Icon title="Close" onClick={() => setSettingsOpen(false)}>
          <CloseIcon style={{ transform: `translate(.5px, 0)` }} size={19} />
        </Icon>
      </div>
      <Option>
        <label>Theme</label>
        <select
          value={theme}
          onChange={(e) =>
            setState((draft) => {
              draft.theme = e.target.value
            })
          }
        >
          {Object.keys(devThemes).map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </Option>
      <Option>
        <label>Fonts</label>
        <input
          value={fonts}
          placeholder="Monospace"
          type="text"
          onChange={(e) =>
            setState((draft) => {
              draft.fonts = e.target.value.replace(/[^a-zA-Z0-9, ]/g, ``)
            })
          }
        />
      </Option>
      <Option>
        <label>Font Size</label>
        <input
          value={fontSize}
          type="number"
          min={10}
          max={20}
          onChange={(e) =>
            setState((draft) => {
              draft.fontSize = Number(e.target.value)
            })
          }
        />
      </Option>
      <Option>
        <label>Transparency</label>
        <input
          type="range"
          min="0"
          step="0.01"
          max=".5"
          value={transparency}
          onChange={(e) =>
            setState((draft) => {
              draft.transparency = Number(e.target.value)
            })
          }
        />
      </Option>
    </Container>
  )
}

export default SettingsPage
