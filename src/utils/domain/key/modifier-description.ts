import {Key, ModifierDescription} from 'nia-protocol-js'

import {NiaKey, NiaKeySerialized, SerializablePB} from '@/utils'
import SerializableObject from '@/utils/serializable-object'

export interface NiaModifierDescriptionObject {
  key: NiaKey,
  alias: string
}

export interface NiaModifierDescriptionSerialized {
  key: NiaKeySerialized,
  alias: string
}

export class NiaModifierDescription implements SerializablePB<NiaModifierDescription, ModifierDescription>,
SerializableObject<NiaModifierDescription, NiaModifierDescriptionSerialized> {
  private readonly key: NiaKey
  private readonly alias: string

  constructor(args: NiaModifierDescriptionObject) {
    this.key = args.key
    this.alias = args.alias
  }

  getKey(): NiaKey {
    return this.key
  }

  getAlias(): string {
    return this.alias
  }

  equals(other: NiaModifierDescription): boolean {
    return this.key.equals(other.getKey())
  }

  serialize(): NiaModifierDescriptionSerialized {
    return {
      key: this.key.serialize(),
      alias: this.alias
    }
  }

  stringify(): string {
    return `Modifier: ${this.key.stringify()}`
  }

  static deserialize(serialized: NiaModifierDescriptionSerialized): NiaModifierDescription {
    const args: NiaModifierDescriptionObject = {
      key: NiaKey.deserialize(serialized.key),
      alias: serialized.alias
    }

    return new NiaModifierDescription(args)
  }

  toPB(): ModifierDescription {
    const keyPB: Key = this.key.toPB()

    const modifierDescriptionPB: ModifierDescription = new ModifierDescription()

    modifierDescriptionPB.setAlias(this.alias)
    modifierDescriptionPB.setKey(keyPB)

    return modifierDescriptionPB
  }

  static fromPB(modifierDescriptionPB: ModifierDescription): NiaModifierDescription {
    const keyPB: Key | undefined = modifierDescriptionPB.getKey()

    if (keyPB === undefined) {
      throw new Error('Key was not set')
    }

    const alias: string = modifierDescriptionPB.getAlias()
    const key: NiaKey = NiaKey.fromPB(keyPB)

    const args: NiaModifierDescriptionObject = {
      key,
      alias
    }

    return new NiaModifierDescription(args)
  }
}