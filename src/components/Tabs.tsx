import styled from "styled-components"
import { TABS, useZ } from "../state/store"

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.faintOutline} !important;
  margin-bottom: 10px;
`
const Tab = styled.p<{ active: boolean }>`
  cursor: pointer;
  color: ${({ active, theme }) =>
    active ? theme.primaryText : theme.faintText};
  opacity: ${({ active }) => (active ? 1 : 0.75)};
`

export const Tabs = () => {
  const store = useZ([`tab`, `setState`])
  return (
    <Header>
      {TABS.map((tab) => (
        <Tab
          key={tab}
          active={tab === store.tab}
          onClick={() =>
            store.setState((draft) => {
              draft.tab = tab
            })
          }
        >
          {tab}
        </Tab>
      ))}
    </Header>
  )
}
