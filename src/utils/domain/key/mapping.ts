import {NiaAction, NiaActionSerialized, NiaKey, NiaKeyChordSerialized, SerializablePB} from '@/utils'
import {Action, KeyChord, Mapping} from 'nia-protocol-js'
import {NiaKeyChord} from '@/utils'

import SerializableObject from '@/utils/serializable-object'

import loggers from '@/utils/logger'
const logger = loggers('mapping')

export interface NiaMappingObject {
  keyChords: Array<NiaKeyChord>
  action: NiaAction
}

export interface NiaMappingSerialized {
  keyChordsSerialized: Array<NiaKeyChordSerialized>
  actionSerialized: NiaActionSerialized
}

export class NiaMapping implements SerializablePB<NiaMapping, Mapping>, SerializableObject<NiaMapping, NiaMappingSerialized> {
  private readonly keyChords: Array<NiaKeyChord>
  private action: NiaAction

  constructor(args: NiaMappingObject) {
    this.keyChords = args.keyChords
    this.action = args.action
  }

  getKeyChords(): Array<NiaKeyChord> {
    return this.keyChords
  }

  getAction(): NiaAction {
    return this.action
  }

  setAction(action: NiaAction) {
    this.action = action
  }

  equals(other: NiaMapping): boolean {
    if (!NiaKeyChord.vectorsAreEqual(this.keyChords, other.keyChords)) {
      return false
    }

    // todo: action equals ...

    return true
  }

  same(other: NiaMapping): boolean {
    if (!NiaKeyChord.vectorsAreSame(this.keyChords, other.keyChords)) {
      return false
    }

    // todo: action equals ...

    return true
  }

  hasKey(key: NiaKey): boolean {
    for (const keyChord of this.keyChords) {
      if (keyChord.hasKey(key)) {
        return true
      }
    }

    return false
  }

  hasKeyExact(key: NiaKey): boolean {
    for (const keyChord of this.keyChords) {
      if (keyChord.hasKeyExact(key)) {
        return true
      }
    }

    return false
  }

  stringify(): string {
    return this.keyChords.map((keyChord: NiaKeyChord) => keyChord.stringify())
      .join(' ')
  }

  toPB(): Mapping {
    const keyChordsPB: Array<KeyChord> = this.keyChords
      .map((keyChord: NiaKeyChord) => keyChord.toPB())

    const actionPB: Action = this.action.toPB()

    const mapping: Mapping = new Mapping()

    mapping.setKeyChordsList(keyChordsPB)
    mapping.setAction(actionPB)

    return mapping
  }

  static fromPB(mapping: Mapping): NiaMapping {
    const actionPB: Action | undefined = mapping.getAction()
    const keyChords: Array<NiaKeyChord> = mapping.getKeyChordsList()
      .map((keyChord: KeyChord) => NiaKeyChord.fromPB(keyChord))

    if (actionPB === undefined) {
      logger.error('Failure: action is undefined.')

      throw new Error('Failure: action is undefined.')
    }

    const action: NiaAction = NiaAction.fromPB(actionPB)

    return new NiaMapping({
      keyChords,
      action
    })
  }

  serialize(): NiaMappingSerialized {
    const keyChordsSerialized: Array<NiaKeyChordSerialized> = this.keyChords
      .map((keyChord: NiaKeyChord) => keyChord.serialize())

    const actionSerialized: NiaActionSerialized = this.action.serialize()

    return {
      keyChordsSerialized,
      actionSerialized
    }
  }

  static deserialize(serialized: NiaMappingSerialized): NiaMapping {
    const keyChords: Array<NiaKeyChord> = serialized.keyChordsSerialized
      .map((keyChordSerialized: NiaKeyChordSerialized) => NiaKeyChord.deserialize(keyChordSerialized))

    const action: NiaAction = NiaAction.deserialize(serialized.actionSerialized)

    return new NiaMapping({
      keyChords,
      action
    })
  }
}
