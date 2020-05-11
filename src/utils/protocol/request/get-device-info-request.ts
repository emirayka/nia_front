import {
  Request,
  GetDeviceInfoRequest,
} from 'nia-protocol-js'

export default class NiaGetDeviceInfoRequest {
  private readonly devicePath: string

  constructor(devicePath: string) {
    this.devicePath = devicePath
  }

  getDevicePath(): string {
    return this.devicePath
  }

  to_request(): Request {
    const getDeviceInfoRequest = new GetDeviceInfoRequest()
    getDeviceInfoRequest.setDevice(this.devicePath)

    const request = new Request()
    request.setGetDeviceInfoRequest(getDeviceInfoRequest)

    return request
  }
}
