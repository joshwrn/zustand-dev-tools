import "react-app-polyfill/ie11"

import { ZustandDevTools } from "../src"
import { create } from "zustand"
import ReactDOM from "react-dom/client"
import { faker } from "@faker-js/faker"
import "./global.scss"

type State = {
  count: number
  inc: (num: number) => void
  dec: (num: number) => void
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
    const fieldName = faker.animal.dog()
    obj[fieldName] = {
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      description: faker.lorem.sentence(),
      createdAt: faker.date.past(),
      relation: createNestedObject(levels - 1),
      level: levels,
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
  inc: (num) => set((state) => ({ count: state.count + num })),
  dec: (num) => set((state) => ({ count: state.count - num })),
  fakeFunction: () => {
    const num = Math.floor(Math.random() * 100)
    return num
  },
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
