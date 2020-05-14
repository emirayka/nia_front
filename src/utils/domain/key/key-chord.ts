import {NiaKey, SerializablePB} from '@/utils'
import {Key, KeyChord} from 'nia-protocol-js'
import {Err} from 'neverthrow'

export class NiaKeyChord implements SerializablePB<NiaKeyChord, KeyChord> {
  private readonly modifiers: Array<NiaKey>
  private readonly ordinaryKey: NiaKey

  constructor(modifiers: Array<NiaKey>, ordinaryKey: NiaKey) {
    this.modifiers = modifiers
    this.ordinaryKey = ordinaryKey
  }

  getModifiers(): Array<NiaKey> {
    return this.definedModifiers
  }

  getOrdinaryKey(): NiaKey {
    return this.ordinaryKey
  }

  toPB(): KeyChord {
    const modifiersPB: Array<Key> = this.definedModifiers
      .map((modifier) => modifier.toPB())

    const ordinaryKeyPB: Key = this.ordinaryKey.toPB()

    const keyChordPB: KeyChord = new KeyChord()

    keyChordPB.setModifiersList(modifiersPB)
    keyChordPB.setOrdinaryKey(ordinaryKeyPB)

    return keyChordPB
  }

  static toPB(keyChord: KeyChord): NiaKeyChord {
    const ordinaryKeyPB: Key | undefined = keyChord.getOrdinaryKey()

    if (ordinaryKeyPB === undefined) {
      throw new Error('Ordinary key is not set')
    }

    const modifiers: Array<NiaKey> = keyChord.getModifiersList()
      .map((keyPB) => NiaKey.fromPB(keyPB))

    const ordinaryKey: NiaKey = NiaKey.fromPB(ordinaryKeyPB)

    return new NiaKeyChord(modifiers, ordinaryKey)
  }
}