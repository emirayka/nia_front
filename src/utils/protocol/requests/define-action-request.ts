import {
  Request,
  DefineActionRequest, Action, NamedAction,
} from 'nia-protocol-js'
import {NiaAction, NiaRequest, NiaRequestType, SerializablePB} from '@/utils'
import {NiaNamedAction} from '@/utils/domain/action/named-action'

export class NiaDefineActionRequest implements SerializablePB<NiaDefineActionRequest, DefineActionRequest> {
  private readonly action: NiaNamedAction

  constructor(action: NiaNamedAction) {
    this.action = action
  }

  getAction(): NiaNamedAction {
    return this.action
  }

  getType(): NiaRequestType {
    return NiaRequestType.DefineAction
  }

  toRequest(): NiaRequest {
    return new NiaRequest(this)
  }

  toPB(): DefineActionRequest {
    const defineActionRequestPB: DefineActionRequest = new DefineActionRequest()
    const actionPB: NamedAction = this.action.toPB()

    defineActionRequestPB.setAction(actionPB)

    return defineActionRequestPB
  }
}
