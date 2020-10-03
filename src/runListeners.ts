import { IStore } from "./models"

export default function runListeners<a>(store: IStore<a>) {
  return () => {
    store.listeners.forEach((listener) => listener.run(store.state))
  }
}
