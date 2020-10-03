import { Dispatch, SetStateAction } from "react"
import cleanUpListener from "./cleanUpListener"
import { IListener, IMapState, IStore } from "./models"

export default function newListenerEffect<a>(
  store: IStore<a>,
  mapState: IMapState<a>,
  originalHook: Dispatch<SetStateAction<a>>
) {
  return () => {
    const newListener: IListener<a> = { oldState: {} as a, run: () => {} }
    newListener.run = mapState
      ? (newState: a) => {
          const mappedState = mapState(newState)
          if (mappedState !== newListener.oldState) {
            newListener.oldState = mappedState
            originalHook(mappedState)
          }
        }
      : originalHook
    store.listeners.push(newListener)
    return cleanUpListener(store, newListener)
  }
}
