import {
  Request,
  DefineActionRequest, Action,
} from 'nia-protocol-js'
import {NiaAction, NiaRequest, NiaRequestType, SerializablePB} from '@/utils'

export class NiaDefineActionRequest implements SerializablePB<NiaDefineActionRequest, DefineActionRequest> {
  private readonly action: NiaAction

  constructor(action: NiaAction) {
    this.action = action
  }

  getAction(): NiaAction {
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
    const actionPB: Action = this.action.toPB()

    defineActionRequestPB.setAction(actionPB)

    return defineActionRequestPB
  }
}
