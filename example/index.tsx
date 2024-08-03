import "react-app-polyfill/ie11"

import { ZustandDevTools } from "../src"
import { create } from "zustand"
import ReactDOM from "react-dom/client"
import { faker } from "@faker-js/faker"
import "./global.scss"

type State = {
  count: number
  inc: () => void
  dec: () => void
}
const randomNumberInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

function createNestedObject(levels: number): any {
  const fieldsPerLevel = randomNumberInRange(3, 5)
  if (levels <= 0) {
    return "Leaf value"
  }

  const obj: any = {}

  for (let i = 0; i < fieldsPerLevel; i++) {
    const fieldName = faker.animal.type()
    obj[fieldName] = {
      id: faker.string.uuid(),
      name: `${fieldName} at level ${levels}`,
      description: faker.lorem.sentence(),
      createdAt: faker.date.past(),
      [faker.location.country()]: createNestedObject(levels - 1),
    }
  }

  return obj
}

const useTestStore = create<State>((set) => ({
  count: 0,
  nullState: null,
  undefinedState: undefined,
  stringState: "string",
  names: ["John", "Jane", "Bob"],
  person: {
    name: "John",
    age: 30,
  },
  nestedObject: createNestedObject(5),
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
