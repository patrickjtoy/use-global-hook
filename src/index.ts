import { IActions, IStore } from "./models"
import setState from "./setState"
import runListeners from "./runListeners"
import associateActions from "./associateActions"
import customHook from "./customHook"

export default function useStore<a>(initialState: a, actions: IActions<a>) {
  const store: IStore<a> = {
    state: initialState,
    listeners: [],
    actions: {},
    setState: () => initialState,
    runListeners: () => {}
  }

  store.setState = setState(store)
  store.runListeners = runListeners(store)
  store.actions = associateActions(store, actions)
  return customHook(store)
}
