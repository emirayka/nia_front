import {
  Request,
  HandshakeRequest, HandshakeResponse, GetDevicesRequest,
} from 'nia-protocol-js'
import {NiaRequest, NiaRequestType, SerializablePB} from '@/utils'

export class NiaHandshakeRequest implements SerializablePB<NiaHandshakeRequest, HandshakeRequest> {
  constructor() {}

  getType(): NiaRequestType {
    return NiaRequestType.Handshake
  }

  toRequest(): NiaRequest {
    return new NiaRequest(this)
  }

  toPB(): HandshakeRequest {
    const handshakeRequest = new HandshakeRequest()

    return handshakeRequest
  }
}
