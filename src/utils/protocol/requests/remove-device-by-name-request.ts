import {
  Request,
  RemoveDeviceByNameRequest
} from 'nia-protocol-js'
import {NiaRequest, NiaRequestType, SerializablePB} from '@/utils'

export class NiaRemoveDeviceByNameRequest implements SerializablePB<NiaRemoveDeviceByNameRequest, RemoveDeviceByNameRequest> {
  private readonly deviceName: string

  constructor(deviceName: string) {
    this.deviceName = deviceName
  }

  getDeviceName(): string {
    return this.deviceName
  }

  getType(): NiaRequestType {
    return NiaRequestType.RemoveDeviceByName
  }

  toRequest(): NiaRequest {
    return new NiaRequest(this)
  }

  toPB(): RemoveDeviceByNameRequest {
    const removeDeviceByNameRequest = new RemoveDeviceByNameRequest()
    removeDeviceByNameRequest.setDeviceName(this.deviceName)

    return removeDeviceByNameRequest
  }
}
