import {GetDefinedMappingsRequest} from 'nia-protocol-js'
import {NiaRequest, NiaRequestType, SerializablePB} from '@/utils'

export class NiaGetDefinedMappingsRequest implements SerializablePB<NiaGetDefinedMappingsRequest, GetDefinedMappingsRequest> {
  constructor() {
  }

  getType(): NiaRequestType {
    return NiaRequestType.GetDefinedMappings
  }

  toRequest(): NiaRequest {
    return new NiaRequest(this)
  }

  toPB(): GetDefinedMappingsRequest {
    const getDefinedMappingsRequest = new GetDefinedMappingsRequest()

    return getDefinedMappingsRequest
  }
}
