import SerializableObject from '../../serializableObj'
import {Modifier} from '@/store/models/modifier'

export interface NiaGetDefinedModifiersResultSerialized {
  definedModifiersSerialized: Array<Modifier>
}

export class NiaGetDefinedModifiersResult implements SerializableObject<NiaGetDefinedModifiersResult, NiaGetDefinedModifiersResultSerialized> {
  private readonly definedModifiers: Array<Modifier>;

  constructor(definedModifiers: Array<Modifier>) {
    this.definedModifiers = definedModifiers
  }

  getDefinedModifiers(): Array<Modifier> {
    return this.definedModifiers
  }

  static deserialize(serialized: NiaGetDefinedModifiersResultSerialized): NiaGetDefinedModifiersResult {
    return new NiaGetDefinedModifiersResult(
      serialized.definedModifiersSerialized
    )
  }

  serialize(): NiaGetDefinedModifiersResultSerialized {
    return {
      definedModifiersSerialized: this.definedModifiers
    }
  }
}
