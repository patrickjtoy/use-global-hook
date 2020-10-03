import { Dispatch, SetStateAction } from "react"

export type IAction<a> = (store: IStore<a>) => unknown
export type IActions<a> = Record<
  string,
  IAction<a> | Record<string, IAction<a>>
>
export type IAssociatedActions = Record<string, unknown>
export type IMapActions = (
  actions: IAssociatedActions
) => Partial<IAssociatedActions>
export type IMapState<a> = (state: a) => SetStateAction<a>

export interface IListener<a> {
  oldState: SetStateAction<a>
  run: Dispatch<SetStateAction<a>>
}

export interface IStore<a> {
  state: a
  listeners: IListener<a>[]
  actions: IAssociatedActions
  setState(newState: a): void
  runListeners(): void
}
