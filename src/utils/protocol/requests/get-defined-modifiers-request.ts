import {
  Request,
  GetDefinedModifiersRequest,
} from 'nia-protocol-js'
import {NiaRequestType, SerializablePB} from '@/utils'

export class NiaGetDefinedModifiersRequest implements SerializablePB<NiaGetDefinedModifiersRequest, GetDefinedModifiersRequest> {
  constructor() {
  }

  getType(): NiaRequestType {
    return NiaRequestType.GetDefinedModifiers
  }

  toPB(): GetDefinedModifiersRequest {
    const getDefinedModifiersRequest = new GetDefinedModifiersRequest()

    return getDefinedModifiersRequest
  }
}
