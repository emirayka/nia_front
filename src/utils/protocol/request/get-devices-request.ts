import {
  Request,
  GetDevicesRequest,
} from 'nia-protocol-js'

export default class NiaGetDevicesRequest {
  constructor() {}

  toResponse(): Request {
    const getDevicesRequest = new GetDevicesRequest()

    const request = new Request()
    request.setGetDevicesRequest(getDevicesRequest)

    return request
  }
}
