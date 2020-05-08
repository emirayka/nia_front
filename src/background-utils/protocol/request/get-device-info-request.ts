import {
  Request,
  GetDeviceInfoRequest,
} from 'nia-protocol-js'

export default class NiaGetDeviceInfoRequest {
  devicePath: string

  constructor(devicePath: string) {
    this.devicePath = devicePath
  }

  to_request(): Request {
    const getDeviceInfoRequest = new GetDeviceInfoRequest()
    getDeviceInfoRequest.setDevice(this.devicePath)

    const request = new Request()
    request.setGetDeviceInfoRequest(getDeviceInfoRequest)

    return request
  }
}
