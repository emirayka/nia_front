import {
  Request,
  IsListeningRequest,
} from 'nia-protocol-js'
import {NiaRequest, NiaRequestType, SerializablePB} from '@/utils'

export class NiaIsListeningRequest implements SerializablePB<NiaIsListeningRequest, IsListeningRequest> {
  constructor() {
  }

  getType(): NiaRequestType {
    return NiaRequestType.IsListening
  }

  toRequest(): NiaRequest {
    return new NiaRequest(this)
  }

  toPB(): IsListeningRequest {
    const executeCodeRequest = new IsListeningRequest()

    return executeCodeRequest
  }
}
