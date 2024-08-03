import type { FC } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

import useSticky from '../hooks/useSticky';
import { numberToHex } from '../utils/color';
import Badge from './Badge';
import RecursiveTree from './RecursiveTree';
import { useZ } from '../state/store';
import { Node } from './List';

export const StateItem: FC<{
  node: Node;
  input: string;
  name: string;
}> = ({ node, input, name }) => {
  let contents = node.value;
  const type = Object.prototype.toString.call(contents.value).slice(8, -1);
  const [ref, isStuck] = useSticky();
  const state = useZ(['setOpenItems', 'openItems']);

  const isDate = contents instanceof Date;
  const isObject = typeof contents === `object` && contents && !isDate;
  const isArray = Array.isArray(contents);
  const isSet = contents instanceof Set;
  const isMap = contents instanceof Map;

  if (isMap || isSet) {
    contents = {
      value: Array.from(contents.value as Map<unknown, unknown> | Set<unknown>),
      key: node.key,
    };
  }

  const shouldStick =
    isStuck && state.openItems[node.key] && (isObject || isArray);

  return (
    <div>
      <Dummy ref={ref} />
      <ItemHeader
        shouldStick={true}
        onClick={() => state.setOpenItems(node.key)}
      >
        <AnimatePresence>
          {shouldStick && (
            <Sticky
              className="sticky"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {type}
            </Sticky>
          )}
        </AnimatePresence>
        <InnerHeader isStuck={shouldStick}>
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
  );
};

export const AtomName: FC<{
  name: string;
  input: string;
}> = ({ name, input }) => {
  if (!name) return null;
  if (!input) {
    return (
      <span>
        <ItemLetter highlight={false}>{name}</ItemLetter>
      </span>
    );
  }

  const words = input.split(` `);
  const wordToHighlight = words.find((word) =>
    name.toLowerCase().includes(word)
  );
  const wordStart = name.toLowerCase().indexOf(wordToHighlight || ``);

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
        );
      })}
    </span>
  );
};

const Dummy = styled.div`
  width: 100px;
  height: 1px;
  position: sticky;
  top: -1px;
`;
const ItemHeader = styled.span<{ shouldStick: boolean }>`
  display: inline-block;
  position: ${({ shouldStick }) => (shouldStick ? `sticky` : `relative`)};
  top: 0;
  z-index: 1;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
`;
const InnerHeader = styled.div<{ isStuck: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  transform: ${({ isStuck }) => (isStuck ? `translateY(5px)` : `none`)};
`;
const ItemLetter = styled.span<{ highlight: boolean }>`
  color: ${({ highlight, theme }) =>
    highlight ? theme.boolean : theme.primaryText};
`;
const Sticky = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.primaryText};
  top: 0px;
  left: 0px;
  justify-content: flex-end;
  backdrop-filter: blur(5px);
  backface-visibility: hidden;
  transform: translateZ(0) scale(1, 1) translateX(-15px);
  padding: 0 17px;
  z-index: -1;
  height: 30px;
  border-bottom: ${({ theme }) =>
    `1px solid ${theme.faintOutline + numberToHex(0.7)}`} !important;
  border-top: ${({ theme }) =>
    `1px solid ${theme.faintOutline + numberToHex(0.7)}`} !important;
`;
