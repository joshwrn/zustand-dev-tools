import type { FC } from "react"

import styled from "styled-components"

import Badge from "./Badge"
import RecursiveTree from "./RecursiveTree"
import { useZ } from "../state/store"
import { Node } from "./List"
import { Text } from "../styles/Styles"

const FunctionItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 10px 0px;
`

export const FunctionItem: FC<{
  node: Node
  input: string
  name: string
}> = ({ node, input, name }) => {
  const state = useZ(["setOpenItems", "openItems"])

  return (
    <FunctionItemContainer>
      <ItemHeader onClick={() => state.setOpenItems(node.key)}>
        <InnerHeader>
          <span title={node.value.toString()}>
            <Badge item={node.value} isMap={false} isSet={false} />
            <AtomName name={name} input={input} />
          </span>
        </InnerHeader>
      </ItemHeader>
      <Text>{node.value.toString()}</Text>
    </FunctionItemContainer>
  )
}

export const StateItem: FC<{
  node: Node
  input: string
  name: string
}> = ({ node, input, name }) => {
  let contents = node.value
  const type = Object.prototype.toString.call(contents).slice(8, -1)
  const state = useZ(["setOpenItems", "openItems"])

  const isSet = contents instanceof Set
  const isMap = contents instanceof Map

  if (isMap || isSet) {
    contents = {
      value: Array.from(contents.value as Map<unknown, unknown> | Set<unknown>),
      key: node.key,
    }
  }

  return (
    <div>
      <ItemHeader onClick={() => state.setOpenItems(node.key)}>
        <InnerHeader>
          <span title={type}>
            <Badge item={contents} isMap={isMap} isSet={isSet} />
            <AtomName name={name} input={input} />
          </span>
        </InnerHeader>
      </ItemHeader>
      {state.openItems[node.key] && (
        <RecursiveTree
          key={node.key}
          branchName={`branch` + node.key}
          contents={contents}
        />
      )}
    </div>
  )
}

export const AtomName: FC<{
  name: string
  input: string
}> = ({ name, input }) => {
  if (!name) return null
  if (!input) {
    return (
      <span>
        <ItemLetter highlight={false}>{name}</ItemLetter>
      </span>
    )
  }

  const words = input.split(` `)
  const wordToHighlight = words.find((word) => name.toLowerCase().includes(word))
  const wordStart = name.toLowerCase().indexOf(wordToHighlight || ``)

  return (
    <span>
      {name.split(``).map((key: string, index: number) => {
        return (
          <ItemLetter
            highlight={
              index >= wordStart &&
              index <= wordStart + (wordToHighlight?.length ?? 1) - 1
            }
            key={index}
          >
            {key}
          </ItemLetter>
        )
      })}
    </span>
  )
}

const ItemHeader = styled.span`
  display: inline-block;
  position: relative;
  top: 0;
  z-index: 1;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
`
const InnerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ItemLetter = styled.span<{ highlight: boolean }>`
  color: ${({ highlight, theme }) =>
    highlight ? theme.boolean : theme.primaryText};
`
