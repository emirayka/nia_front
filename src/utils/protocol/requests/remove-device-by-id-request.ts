import {
  Request,
  RemoveDeviceByIdRequest
} from 'nia-protocol-js'
import {NiaRequest, NiaRequestType, SerializablePB} from '@/utils'

export class NiaRemoveDeviceByIdRequest implements SerializablePB<NiaRemoveDeviceByIdRequest, RemoveDeviceByIdRequest> {
  private readonly deviceId: number

  constructor(deviceId: number) {
    this.deviceId = deviceId
  }

  getDeviceId(): number {
    return this.deviceId
  }

  getType(): NiaRequestType {
    return NiaRequestType.RemoveDeviceById
  }

  toRequest(): NiaRequest {
    return new NiaRequest(this)
  }

  toPB(): RemoveDeviceByIdRequest {
    const removeDeviceByIdRequest = new RemoveDeviceByIdRequest()
    removeDeviceByIdRequest.setDeviceId(this.deviceId)

    return removeDeviceByIdRequest
  }
}
