import {
  Request,
  DefineModifierRequest, ModifierDescription,
} from 'nia-protocol-js'
import {NiaModifierDescription, NiaRequest, NiaRequestType, SerializablePB} from '@/utils'

export class NiaDefineModifierRequest implements SerializablePB<NiaDefineModifierRequest, DefineModifierRequest> {
  private readonly modifier: NiaModifierDescription

  constructor(modifier: NiaModifierDescription) {
    this.modifier = modifier
  }

  getModifier(): NiaModifierDescription {
    return this.modifier
  }

  getType(): NiaRequestType {
    return NiaRequestType.DefineModifier
  }

  toRequest(): NiaRequest {
    return new NiaRequest(this)
  }

  toPB(): DefineModifierRequest {
    const modifierDescriptionPB: ModifierDescription = this.modifier.toPB()
    const defineModifierRequest = new DefineModifierRequest()
    defineModifierRequest.setModifier(modifierDescriptionPB)

    return defineModifierRequest
  }
}
