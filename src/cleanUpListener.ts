import { IListener, IStore } from "./models"

export default function cleanUpListene<a>(
  store: IStore<a>,
  newListener: IListener<a>
) {
  return () => {
    store.listeners = store.listeners.filter(
      (listener) => listener !== newListener
    )
  }
}
