import { IActions, IAssociatedActions, IStore } from "./models"

export default function associateActions<a>(
  store: IStore<a>,
  actions: IActions<a>
) {
  const associatedActions: IAssociatedActions = {}
  Object.entries(actions).forEach(([key, value]) => {
    if (typeof value === "function") {
      associatedActions[key] = value(store)
    }
    if (typeof value === "object") {
      associatedActions[key] = associateActions(store, value)
    }
  })
  return associatedActions
}
