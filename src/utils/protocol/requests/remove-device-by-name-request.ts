import {
  Request,
  RemoveDeviceByNameRequest
} from 'nia-protocol-js'
import {NiaRequestType, SerializablePB} from '@/utils'

export class NiaRemoveDeviceByNameRequest implements SerializablePB<NiaRemoveDeviceByNameRequest, RemoveDeviceByNameRequest> {
  private readonly keyboardName: string

  constructor(keyboardName: string) {
    this.keyboardName = keyboardName
  }

  getDeviceName(): string {
    return this.keyboardName
  }

  getType(): NiaRequestType {
    return NiaRequestType.RemoveDeviceByName
  }

  toPB(): RemoveDeviceByNameRequest {
    const removeDeviceByNameRequest = new RemoveDeviceByNameRequest()
    removeDeviceByNameRequest.setDeviceName(this.keyboardName)

    return removeDeviceByNameRequest
  }
}
