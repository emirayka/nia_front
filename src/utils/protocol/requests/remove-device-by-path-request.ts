import {
  Request,
  RemoveDeviceByPathRequest
} from 'nia-protocol-js'
import {NiaRequestType, SerializablePB} from '@/utils'

export class NiaRemoveDeviceByPathRequest implements SerializablePB<NiaRemoveDeviceByPathRequest, RemoveDeviceByPathRequest> {
  private readonly devicePath: string

  constructor(devicePath: string) {
    this.devicePath = devicePath
  }

  getDevicePath(): string {
    return this.devicePath
  }

  getType(): NiaRequestType {
    return NiaRequestType.RemoveDeviceByPath
  }

  toPB(): RemoveDeviceByPathRequest {
    const removeDeviceByPathRequest = new RemoveDeviceByPathRequest()
    removeDeviceByPathRequest.setDevicePath(this.devicePath)

    return removeDeviceByPathRequest
  }
}
