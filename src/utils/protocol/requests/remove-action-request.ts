import {
  Request,
  RemoveActionRequest
} from 'nia-protocol-js'
import {NiaRequest, NiaRequestType, SerializablePB} from '@/utils'

export class NiaRemoveActionRequest implements SerializablePB<NiaRemoveActionRequest, RemoveActionRequest> {
  private readonly actionName: string

  constructor(actionName: string) {
    this.actionName = actionName
  }

  getActionName(): string {
    return this.actionName
  }

  getType(): NiaRequestType {
    return NiaRequestType.RemoveAction
  }

  toRequest(): NiaRequest {
    return new NiaRequest(this)
  }

  toPB(): RemoveActionRequest {
    const removeActionRequestPB: RemoveActionRequest = new RemoveActionRequest()

    removeActionRequestPB.setActionName(this.actionName)

    return removeActionRequestPB
  }
}
