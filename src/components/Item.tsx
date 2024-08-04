import { useEffect, useState, type FC } from "react"

import styled from "styled-components"

import Badge from "./Badge"
import RecursiveTree from "./RecursiveTree"
import { useZ } from "../state/store"
import { Node } from "./List"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"

import * as prettier from "prettier/standalone"
import * as babel from "prettier/parser-babel"
import * as prettierPluginEstree from "prettier/plugins/estree"

const FunctionItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 10px 0px 5px 0px;
  border-radius: 5px;
  border-bottom: 1px solid ${({ theme }) => theme.faintOutline} !important;
  color: ${({ theme }) => theme.primaryText};
  width: 100%;
  overflow-x: auto;
  * {
    background: none !important;
  }
`

const SyntaxCode: FC<{
  node: Node
  name: string
}> = ({ node, name }) => {
  const state = useZ(["setOpenItems", "theme"])
  const [formatted, setFormatted] = useState("")

  useEffect(() => {
    const formatCode = async () => {
      try {
        const result = await prettier.format(`const ${name} = ${node.value}`, {
          parser: "babel",
          plugins: [babel, prettierPluginEstree],
          semi: false,
          singleQuote: true,
        })
        setFormatted(result)
      } catch (error) {
        console.error("Formatting error:", error)
        setFormatted("Error formatting code")
      }
    }
    formatCode()
  }, [node.value])

  return (
    <SyntaxHighlighter
      onClick={() => state.setOpenItems(node.key)}
      language="javascript"
      showInlineLineNumbers={true}
      style={{
        ...(state.theme === `dark` ? atomDark : oneLight),
        'pre[class*="language-"]': {
          background: "transparent !important",
          cursor: "pointer",
        },
      }}
    >
      {formatted}
    </SyntaxHighlighter>
  )
}

export const FunctionItem: FC<{
  node: Node
  input: string
  name: string
}> = ({ node, input, name }) => {
  const state = useZ(["setOpenItems", "openItems", "theme"])

  return (
    <FunctionItemContainer>
      {!state.openItems[node.key] && (
        <ItemHeader
          onClick={() => state.setOpenItems(node.key)}
          style={{
            position: "sticky",
            left: 0,
            paddingBottom: "5px",
          }}
        >
          <InnerHeader>
            <span title={node.value.toString()}>
              <Badge item={node.value} isMap={false} isSet={false} />
              <AtomName name={name} input={input} />
            </span>
          </InnerHeader>
        </ItemHeader>
      )}
      {state.openItems[node.key] && <SyntaxCode node={node} name={name} />}
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
