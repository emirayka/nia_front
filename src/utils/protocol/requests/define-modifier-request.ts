import {
  Request,
  DefineModifierRequest,
} from 'nia-protocol-js'
import {NiaRequest, NiaRequestType, SerializablePB} from '@/utils'

export class NiaDefineModifierRequest implements SerializablePB<NiaDefineModifierRequest, DefineModifierRequest> {
  private readonly deviceId: number
  private readonly keyCode: number
  private readonly modifierAlias: string

  constructor(deviceId: number, keyCode: number, modifierAlias: string) {
    this.deviceId = deviceId
    this.keyCode = keyCode
    this.modifierAlias = modifierAlias
  }

  getDeviceId(): number {
    return this.deviceId
  }

  getKeyCode(): number {
    return this.keyCode
  }

  getModifierAlias(): string {
    return this.modifierAlias
  }

  getType(): NiaRequestType {
    return NiaRequestType.DefineModifier
  }

  toRequest(): NiaRequest {
    return new NiaRequest(this)
  }

  toPB(): DefineModifierRequest {
    const defineModifierRequest = new DefineModifierRequest()
    defineModifierRequest.setDeviceId(this.deviceId)
    defineModifierRequest.setKeyCode(this.keyCode)
    defineModifierRequest.setModifierAlias(this.modifierAlias)

    return defineModifierRequest
  }
}
