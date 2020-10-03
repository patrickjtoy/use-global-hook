import * as React from "react"
import { IAssociatedActions, IMapActions, IMapState, IStore } from "./models"
import newListenerEffect from "./newListenerEffect"

function getMappedActions<a>(store: IStore<a>, mapActions: IMapActions) {
  return React.useMemo(
    () => (mapActions ? mapActions(store.actions) : store.actions),
    [mapActions, store.actions]
  )
}

export default function customHook<a>(store: IStore<a>) {
  return (mapState: IMapState<a>, mapActions: IMapActions) => {
    const state = mapState ? mapState(store.state) : store.state
    const actions = getMappedActions(store, mapActions)
    const [_, originalHook] = React.useState<a>(Object.create(null))
    const listenerEffect = newListenerEffect(store, mapState, originalHook)
    React.useEffect(listenerEffect, [])
    return [state, actions]
  }
}
