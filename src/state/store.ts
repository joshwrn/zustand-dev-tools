import { produce } from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';

export type Store = {
  theme: string;
  width: number;
  fonts: string;
  openItems: { [key: string]: boolean };
  transparency: number;
  setOpenItems: (key: string) => void;
  devToolsOpen: boolean;
  setDevToolsOpen: (open: boolean) => void;
  userInput: string;
  setUserInput: (input: string) => void;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  position: { x: number; y: number };
  setPosition: (x: number, y: number) => void;
  setState: (setter: (draft: Store) => void) => void;
  isQuickMenuOpen: boolean;
};

export type Set = (
  partial: Store | Partial<Store> | ((state: Store) => Store | Partial<Store>),
  replace?: boolean | undefined
) => void;

export const produceState = (set: Set, newState: (draft: Store) => void) => {
  return set(produce<Store>(newState));
};

export const useFullStore = create<Store>()(
  persist(
    (set) => ({
      setState: (setter: (draft: Store) => void) => {
        produceState(set, setter);
      },
      transparency: 0.1,
      width: 430,
      isQuickMenuOpen: false,
      theme: `Github Dark`,
      fonts: 'jetbrains mono',
      position: { x: 0, y: 0 },
      setPosition: (x: number, y: number) => {
        set((state) => ({
          position: { x, y },
        }));
      },
      fontSize: 14,
      setFontSize: (size: number) => {
        set((state) => ({
          fontSize: size,
        }));
      },
      settingsOpen: false,
      setSettingsOpen: (open: boolean) => {
        set((state) => ({
          settingsOpen: open,
        }));
      },
      userInput: ``,
      setUserInput: (input: string) => {
        set((state) => ({
          userInput: input,
        }));
      },
      openItems: {},
      setOpenItems: (key: string) => {
        set((state) => ({
          openItems: {
            ...state.openItems,
            [key]: !state.openItems[key],
          },
        }));
      },
      devToolsOpen: false,
      setDevToolsOpen: (open: boolean) => {
        set((state) => ({
          devToolsOpen: open,
        }));
      },
    }),
    {
      name: 'devtools-settings',
    }
  )
);

export const useZ = <T extends keyof Store>(selected: T[]) => {
  return useFullStore(
    useShallow((state: Store) => {
      return selected.reduce((acc, key) => {
        acc[key] = state[key];
        return acc;
      }, {} as Pick<Store, T>);
    })
  );
};
