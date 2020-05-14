import {NiaAction} from '@/utils/domain/action/action'
import {SerializablePB} from '@/utils'
import {Action, ActionList} from 'nia-protocol-js'

export class NiaActionList implements SerializablePB<NiaActionList, ActionList> {
  actions: Array<NiaAction>

  constructor(actions: Array<NiaAction>) {
    this.actions = actions
  }

  getActions(): Array<NiaAction> {
    return this.actions
  }

  toPB(): ActionList {
    const actionsPB: Array<Action> = this.actions
      .map(action => action.toPB())

    const actionListPB: ActionList = new ActionList()

    actionListPB.setActionsList(actionsPB)

    return actionListPB
  }

  static fromPB(actionListPB: ActionList): NiaActionList {
    const actionsPB: Array<Action> = actionListPB.getActionsList()
    const actions: Array<NiaAction> = actionsPB.map((actionPB) => NiaAction.fromPB(actionPB))

    return new NiaActionList(actions)
  }
}