import {Key, ModifierDescription} from 'nia-protocol-js'

import {NiaKey, SerializablePB} from '@/utils'

export class NiaModifierDescription implements SerializablePB<NiaModifierDescription, ModifierDescription> {
  private readonly key: NiaKey
  private readonly alias: string

  constructor(key: NiaKey, alias: string) {
    this.key = key
    this.alias = alias
  }

  getKey(): NiaKey {
    return this.key
  }

  getAlias(): string {
    return this.alias
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

    return new NiaModifierDescription(key, alias)
  }
}