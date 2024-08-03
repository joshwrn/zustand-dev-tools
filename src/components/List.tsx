import type { FC } from "react"
import { useMemo, Fragment } from "react"

import styled from "styled-components"

import { numberToHex } from "../utils/color"
import { FunctionItem, StateItem } from "./Item"
import { TABS, useFullStore } from "../state/store"
import { Text } from "../styles/Styles"
import { Tabs } from "./Tabs"

export type Node = {
  value: any
  key: string
}

const List: FC<{
  state: Object
}> = ({ state }) => {
  const store = useFullStore()
  const stateArray = useMemo(() => {
    const arr = []
    for (const [key, value] of Object.entries({
      ...state,
      devTools: store,
    })) {
      arr.push({ key, value })
    }
    return arr
      .filter((node) =>
        store.userInput
          .split(` `)
          .some((phrase) => node.key.toLowerCase().includes(phrase))
      )
      .sort((a, b) => {
        return a.key > b.key ? 1 : -1
      })
  }, [state, store, store.userInput]) as Node[]

  const functionsArray = useMemo(() => {
    return stateArray.filter((node) => typeof node.value === `function`)
  }, [stateArray])

  return (
    <Container transparency={store.transparency} width={store.width}>
      <Tabs />
      {store.tab === `state` &&
        stateArray
          .filter((node) => typeof node.value !== `function`)
          .map((node) => {
            return (
              <Fragment key={`list-` + node.key}>
                <StateItem node={node} input={store.userInput} name={node.key} />
              </Fragment>
            )
          })}
      {store.tab === `functions` &&
        functionsArray.length > 0 &&
        functionsArray.map((node) => {
          return (
            <Fragment key={`list-` + node.key}>
              <FunctionItem
                node={node}
                input={store.userInput}
                name={node.key}
              />
            </Fragment>
          )
        })}
      {stateArray.length === 0 && (
        <Text style={{ padding: `10px` }}>No matches found</Text>
      )}
    </Container>
  )
}

export default List

const Container = styled.div<{
  width: number
  transparency: number
}>`
  .sticky {
    width: ${({ width }) => width + `px`};
    background: ${({ theme, transparency }) =>
      `${theme.headerBackground}${numberToHex(
        transparency > 0.3 ? transparency + 0.3 : 0.6
      )}`};
    backdrop-filter: blur(30px);
  }
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 0 10px;
`
