import type { FC } from "react"

import { VscCloseAll } from "react-icons/vsc"

import styled from "styled-components"

import { numberToHex } from "../utils/color"
import { useZ } from "../state/store"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: fit-content;
  height: fit-content;
  border: 1px solid ${({ theme }) => theme.faintOutline} !important;
  border-radius: 4px;
  padding: 8px;
  top: 130%;
  right: 10%;
  gap: 8px;
  background-color: ${({ theme }) => theme.headerBackground};
  ::before {
    content: "";
    content: "";
    position: absolute;
    bottom: 100%;
    right: 4px;
    margin-left: -5px;
    border-width: 7px;
    border-style: solid;
    border-color: transparent transparent ${({ theme }) => theme.faintOutline}
      transparent;
  }
  ::after {
    content: "";
    content: "";
    position: absolute;
    bottom: 100%;
    right: 6px;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent
      ${({ theme }) => theme.headerBackground} transparent;
  }
`

const Item = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  border-radius: 3px;
  white-space: nowrap;
  transition: background-color 0.2s;
  color: ${({ theme }) => theme.faintText};
  font-size: 12px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.iconBackground + numberToHex(0.8)};
  svg {
    transform: translateY(-1px);
    font-size: 15px;
  }
  :hover {
    background-color: ${({ theme }) => theme.iconBackground + numberToHex(0.3)};
  }
`

const QuickMenu: FC = () => {
  const state = useZ(["setOpenItems", "setState"])

  return (
    <Container>
      <Item
        onClick={() => {
          state.setState((draft) => {
            draft.openItems = {}
            draft.isQuickMenuOpen = false
          })
        }}
      >
        <VscCloseAll />
        Close All
      </Item>
    </Container>
  )
}

export default QuickMenu
