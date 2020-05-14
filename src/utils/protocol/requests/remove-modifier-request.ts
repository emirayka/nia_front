import {
  Request,
  RemoveModifierRequest
} from 'nia-protocol-js'
import {NiaRequestType, SerializablePB} from '@/utils'

export class NiaRemoveModifierRequest implements SerializablePB<NiaRemoveModifierRequest, RemoveModifierRequest> {
  private readonly deviceId: number
  private readonly keyCode: number

  constructor(deviceId: number, keyCode: number) {
    this.deviceId = deviceId
    this.keyCode = keyCode
  }

  getDeviceId(): number {
    return this.deviceId
  }

  getKeyCode(): number {
    return this.keyCode
  }

  getType(): NiaRequestType {
    return NiaRequestType.RemoveModifier
  }

  toPB(): RemoveModifierRequest {
    const removeModifierRequest = new RemoveModifierRequest()
    removeModifierRequest.setDeviceId(this.deviceId)
    removeModifierRequest.setKeyCode(this.keyCode)

    return removeModifierRequest
  }
}
