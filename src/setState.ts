import { IStore } from "./models"

export default function setState<a>(store: IStore<a>) {
  return (newState: a) => {
    store.state = { ...store.state, ...newState }
    store.runListeners()
  }
}
