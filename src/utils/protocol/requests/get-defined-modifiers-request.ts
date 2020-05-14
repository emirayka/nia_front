import {
  Request,
  GetDefinedModifiersRequest,
} from 'nia-protocol-js'
import {NiaRequest, NiaRequestType, SerializablePB} from '@/utils'

export class NiaGetDefinedModifiersRequest implements SerializablePB<NiaGetDefinedModifiersRequest, GetDefinedModifiersRequest> {
  constructor() {
  }

  getType(): NiaRequestType {
    return NiaRequestType.GetDefinedModifiers
  }

  toRequest(): NiaRequest {
    return new NiaRequest(this)
  }

  toPB(): GetDefinedModifiersRequest {
    const getDefinedModifiersRequest = new GetDefinedModifiersRequest()

    return getDefinedModifiersRequest
  }
}
