import {
  Request,
  HandshakeRequest,
} from 'nia-protocol-js'

export default class NiaHandshakeRequest {
  constructor() {
  }

  toRequest(): Request {
    const handshakeRequest = new HandshakeRequest()

    const request = new Request()
    request.setHandshakeRequest(handshakeRequest)

    return request
  }
}
