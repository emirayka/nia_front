import {
  Request,
  GetDefinedActionsRequest,
} from 'nia-protocol-js'
import {NiaRequest, NiaRequestType, SerializablePB} from '@/utils'

export class NiaGetDefinedActionsRequest implements SerializablePB<NiaGetDefinedActionsRequest, GetDefinedActionsRequest> {
  constructor() {
  }

  getType(): NiaRequestType {
    return NiaRequestType.GetDefinedActions
  }

  toRequest(): NiaRequest {
    return new NiaRequest(this)
  }

  toPB(): GetDefinedActionsRequest {
    const getDefinedActionsRequest = new GetDefinedActionsRequest()

    return getDefinedActionsRequest
  }
}
