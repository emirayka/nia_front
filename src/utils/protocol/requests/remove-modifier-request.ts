import {
  Request,
  RemoveModifierRequest, Key,
} from 'nia-protocol-js'
import {NiaKey, NiaRequest, NiaRequestType, SerializablePB} from '@/utils'

export class NiaRemoveModifierRequest implements SerializablePB<NiaRemoveModifierRequest, RemoveModifierRequest> {
  private readonly key: NiaKey

  constructor(key: NiaKey) {
    this.key = key
  }

  getKey(): NiaKey {
    return this.key
  }

  getType(): NiaRequestType {
    return NiaRequestType.RemoveModifier
  }

  toRequest(): NiaRequest {
    return new NiaRequest(this)
  }

  toPB(): RemoveModifierRequest {
    const modifierKeyPB: Key = this.key.toPB()

    const removeModifierRequest = new RemoveModifierRequest()
    removeModifierRequest.setModifierKey(modifierKeyPB)

    return removeModifierRequest
  }
}
