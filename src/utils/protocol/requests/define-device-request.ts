import {DefineDeviceRequest} from 'nia-protocol-js'
import {SerializablePB} from '@/utils/serializable-pb'
import {NiaRequest, NiaRequestType} from '@/utils'

export class NiaDefineDeviceRequest implements SerializablePB<NiaDefineDeviceRequest, DefineDeviceRequest> {
  private readonly deviceId: number

  constructor(deviceId: number) {
    this.deviceId = deviceId
  }

  getDeviceId(): number {
    return this.deviceId
  }

  getType(): NiaRequestType {
    return NiaRequestType.DefineDevice
  }

  toRequest(): NiaRequest {
    return new NiaRequest(this)
  }

  toPB(): DefineDeviceRequest {
    const defineDeviceRequest = new DefineDeviceRequest()
    defineDeviceRequest.setDeviceId(this.deviceId)

    return defineDeviceRequest
  }
}
