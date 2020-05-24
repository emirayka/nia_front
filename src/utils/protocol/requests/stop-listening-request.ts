import {
  Request,
  StopListeningRequest,
} from 'nia-protocol-js'
import {NiaRequest, NiaRequestType, SerializablePB} from '@/utils'

export class NiaStopListeningRequest implements SerializablePB<NiaStopListeningRequest, StopListeningRequest> {
  constructor() {
  }

  getType(): NiaRequestType {
    return NiaRequestType.StopListening
  }

  toRequest(): NiaRequest {
    return new NiaRequest(this)
  }

  toPB(): StopListeningRequest {
    let startListeningRequest: StopListeningRequest = new StopListeningRequest()

    return startListeningRequest
  }
}
