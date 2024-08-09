# Zustand State Inspector

<img width="1188" alt="Screenshot 2024-08-09 at 8 33 46 AM" src="https://github.com/user-attachments/assets/d4fd6253-7156-45f5-a5ed-d3a8ce77c35e">

## Installation

```bash
npm install zustand-state-inspector
```

## Usage

```tsx
import { create } from "zustand"
import { ZustandDevTools } from "zustand-state-inspector"

const useYourStore = create<State>((set) => ({
  count: 0,
  inc: (num) => set((state) => ({ count: state.count + num })),
  dec: (num) => set((state) => ({ count: state.count - num })),
}))

const App = () => {
  const store = useYourStore()
  return (
    <div className="app">
      <ZustandDevTools state={store} />
    </div>
  )
}
```

## Props

| Prop            | Description                                                                           |
| --------------- | ------------------------------------------------------------------------------------- |
| state           | The zustand store to inspect                                                          |
| showDevTools    | Take control of the showDevTools state. Will hide the default icon if it's provided   |
| setShowDevTools | If you're passing in showDevTools, you need to pass in a setter function to update it |
