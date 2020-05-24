import {NiaKey, NiaKeySerialized, NiaMapping, SerializablePB} from '@/utils'
import {Key, KeyChord} from 'nia-protocol-js'
import SerializableObject from '@/utils/serializable-object'

export interface NiaKeyChordObject {
  modifiers: Array<NiaKey>
  ordinaryKey: NiaKey
}

export interface NiaKeyChordSerialized {
  modifiersSerialized: Array<NiaKeySerialized>
  ordinaryKeySerialized: NiaKeySerialized
}

export class NiaKeyChord implements SerializablePB<NiaKeyChord, KeyChord>, SerializableObject<NiaKeyChord, NiaKeyChordSerialized> {
  private readonly modifiers: Array<NiaKey>
  private readonly ordinaryKey: NiaKey

  constructor(args: NiaKeyChordObject) {
    this.modifiers = args.modifiers
    this.ordinaryKey = args.ordinaryKey
  }

  getModifiers(): Array<NiaKey> {
    return this.modifiers
  }

  getOrdinaryKey(): NiaKey {
    return this.ordinaryKey
  }

  equals(other: NiaKeyChord): boolean {
    if (! this.ordinaryKey.equals(other.ordinaryKey)) {
      return false
    }

    if (this.modifiers.length !== other.modifiers.length) {
      return false
    }

    for (const modifier of this.modifiers) {
      let flag: boolean = true

      for (const otherModifier of other.modifiers) {
        if (modifier.equals(otherModifier)) {
          flag = false
        }
      }

      if (flag) {
        return false
      }
    }

    for (const otherModifier of other.modifiers) {
      let flag: boolean = true

      for (const modifier of this.modifiers) {
        if (modifier.equals(otherModifier)) {
          flag = false
        }
      }

      if (flag) {
        return false
      }
    }

    return true
  }

  same(other: NiaKeyChord): boolean {
    if (! this.ordinaryKey.same(other.ordinaryKey)) {
      return false
    }

    if (this.modifiers.length !== other.modifiers.length) {
      return false
    }

    for (const modifier of this.modifiers) {
      let flag: boolean = true

      for (const otherModifier of other.modifiers) {
        if (modifier.same(otherModifier)) {
          flag = false
        }
      }

      if (flag) {
        return false
      }
    }

    for (const otherModifier of other.modifiers) {
      let flag: boolean = true

      for (const modifier of this.modifiers) {
        if (modifier.same(otherModifier)) {
          flag = false
        }
      }

      if (flag) {
        return false
      }
    }

    return true
  }

  static vectorsAreEqual(first: Array<NiaKeyChord>, second: Array<NiaKeyChord>): boolean {
    if (first.length !== second.length) {
      return false
    }

    let index: number = 0

    for (const firstKeyChord of first) {
      const secondKeyChord: NiaKeyChord = second[index]

      if (! firstKeyChord.equals(secondKeyChord)) {
        return false
      }

      index += 1
    }

    return true
  }

  static vectorsAreSame(first: Array<NiaKeyChord>, second: Array<NiaKeyChord>): boolean {
    if (first.length !== second.length) {
      return false
    }

    let index: number = 0

    for (const firstKeyChord of first) {
      const secondKeyChord: NiaKeyChord = second[index]

      if (! firstKeyChord.same(secondKeyChord)) {
        return false
      }

      index += 1
    }

    return true
  }

  stringify(): string {
    const keys: Array<NiaKey> = [
      ...this.modifiers,
      this.ordinaryKey,
    ]

    return keys.map((key: NiaKey) => key.stringify())
      .join('+')
  }

  toPB(): KeyChord {
    const modifiersPB: Array<Key> = this.modifiers
      .map((modifier) => modifier.toPB())

    const ordinaryKeyPB: Key = this.ordinaryKey.toPB()

    const keyChordPB: KeyChord = new KeyChord()

    keyChordPB.setModifiersList(modifiersPB)
    keyChordPB.setOrdinaryKey(ordinaryKeyPB)

    return keyChordPB
  }

  static fromPB(keyChord: KeyChord): NiaKeyChord {
    const ordinaryKeyPB: Key | undefined = keyChord.getOrdinaryKey()

    if (ordinaryKeyPB === undefined) {
      throw new Error('Ordinary key is not set')
    }

    const modifiers: Array<NiaKey> = keyChord.getModifiersList()
      .map((keyPB) => NiaKey.fromPB(keyPB))

    const ordinaryKey: NiaKey = NiaKey.fromPB(ordinaryKeyPB)

    return new NiaKeyChord({
      modifiers,
      ordinaryKey,
    })
  }

  serialize(): NiaKeyChordSerialized {
    const modifiersSerialized: Array<NiaKeySerialized> = this.modifiers
      .map((modifier: NiaKey) => modifier.serialize())

    const ordinaryKeySerialized: NiaKeySerialized = this.ordinaryKey
      .serialize()

    return {
      modifiersSerialized,
      ordinaryKeySerialized,
    }
  }

  static deserialize(serialized: NiaKeyChordSerialized): NiaKeyChord {
    const modifiers: Array<NiaKey> = serialized.modifiersSerialized
      .map((niaKeySerialized: NiaKeySerialized) => NiaKey.deserialize(niaKeySerialized))

    const ordinaryKey: NiaKey = NiaKey.deserialize(serialized.ordinaryKeySerialized)

    return new NiaKeyChord({
      modifiers,
      ordinaryKey,
    })
  }

  static fromString(s: string): NiaKeyChord | null {
    let keys: Array<NiaKey | null> = s.split('+')
      .map((s) => NiaKey.fromString(s))

    let keys2: Array<NiaKey> = []

    for (const key of keys) {
      if (key === null) {
        return null
      }

      keys2.push(key)
    }

    if (keys2.length === 0) {
      return null
    }

    const modifiers: Array<NiaKey> = keys2.slice(0, keys.length - 1)
    const ordinaryKey: NiaKey = keys2[keys.length - 1]

    return new NiaKeyChord({
      modifiers,
      ordinaryKey
    })
  }
}