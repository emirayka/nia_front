import {
  Request,
  HandshakeRequest, HandshakeResponse, GetDevicesRequest,
} from 'nia-protocol-js'
import {NiaRequestType, SerializablePB} from '@/utils'

export class NiaHandshakeRequest implements SerializablePB<NiaHandshakeRequest, HandshakeRequest> {
  constructor() {}

  getType(): NiaRequestType {
    return NiaRequestType.Handshake
  }

  toPB(): HandshakeRequest {
    const handshakeRequest = new HandshakeRequest()

    return handshakeRequest
  }
}
