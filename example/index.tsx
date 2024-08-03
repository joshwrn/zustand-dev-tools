import "react-app-polyfill/ie11"

import { ZustandDevTools } from "../."
import { create } from "zustand"
import ReactDOM from "react-dom/client"
import "./global.scss"

type State = {
  count: number
  inc: () => void
  dec: () => void
}

const useTestStore = create<State>((set) => ({
  count: 0,
  names: ["John", "Jane", "Bob"],
  person: {
    name: "John",
    age: 30,
  },
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 })),
}))

const App = () => {
  const store = useTestStore()
  return (
    <div className="app">
      <ZustandDevTools state={store} />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById(`root`) as HTMLElement).render(
  <App />
)
