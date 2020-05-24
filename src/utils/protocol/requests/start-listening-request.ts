import {
  Request,
  StartListeningRequest,
} from 'nia-protocol-js'
import {NiaRequest, NiaRequestType, SerializablePB} from '@/utils'

export class NiaStartListeningRequest implements SerializablePB<NiaStartListeningRequest, StartListeningRequest> {
  constructor() {
  }

  getType(): NiaRequestType {
    return NiaRequestType.StartListening
  }

  toRequest(): NiaRequest {
    return new NiaRequest(this)
  }

  toPB(): StartListeningRequest {
    let startListeningRequest: StartListeningRequest = new StartListeningRequest()

    return startListeningRequest
  }
}
