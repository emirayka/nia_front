import KeyboardModel from '@/store/models/keyboard-model'
import DeviceInfo from '@/store/models/device-info'

import NiaSynchronizeEvent from '@/utils/event/events/synchronize-event'
import NiaHandshakeResult from '@/utils/protocol/result/handshake-result'
import NiaGetDeviceInfoResult from '@/utils/protocol/result/get-device-info-result'
import NiaEventResponse from '@/utils/event/response/response'

export default class NiaSynchronizeEventResponse {
  private readonly version: string
  private readonly info: string
  private readonly devicesInfo: Array<DeviceInfo>

  constructor(
    synchronizeEvent: NiaSynchronizeEvent,
    handshakeResult: NiaHandshakeResult,
    getDeviceInfoResults: Array<NiaGetDeviceInfoResult>,
  ) {
    this.version = handshakeResult.getVersion()
    this.info = handshakeResult.getInfo()
    this.devicesInfo = getDeviceInfoResults.map((getDeviceInfoResult: NiaGetDeviceInfoResult) => {
      const deviceInfo: DeviceInfo = {
        name: getDeviceInfoResult.getName(),
        path: getDeviceInfoResult.getPath(),
        model: JSON.parse(getDeviceInfoResult.getModel()) as KeyboardModel,
        defined: false // todo: fix
      }
      
      return deviceInfo
    })
  }
  
  getVersion(): string {
    return this.version
  }
  
  getInfo(): string {
    return this.info
  }

  getDevicesInfo(): Array<DeviceInfo> {
    return this.devicesInfo
  }

  toEventResponse(): NiaEventResponse {
    const niaEventResponse = new NiaEventResponse(this)

    return niaEventResponse
  }
}
