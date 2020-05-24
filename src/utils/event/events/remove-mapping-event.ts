import {
  NiaEvent, NiaEventType,
} from '@/utils/event'

import SerializableObject from '@/utils/serializable-object'
import {NiaKeyChord, NiaKeyChordSerialized, NiaMapping, NiaMappingSerialized} from '@/utils'
import {KeyChord} from 'nia-protocol-js'

export interface NiaRemoveMappingEventObject {
  keyChords: Array<NiaKeyChord>
}

export type NiaRemoveMappingEventSerialized = {
  keyChordsSerialized: Array<NiaKeyChordSerialized>
}

export class NiaRemoveMappingEvent implements SerializableObject<NiaRemoveMappingEvent, NiaRemoveMappingEventSerialized> {
  private readonly keyChords: Array<NiaKeyChord>

  constructor(args: NiaRemoveMappingEventObject) {
    this.keyChords = args.keyChords
  }

  getKeyChords(): Array<NiaKeyChord> {
    return this.keyChords
  }

  getEventType(): NiaEventType {
    return NiaEventType.RemoveMapping
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }

  serialize(): NiaRemoveMappingEventSerialized {
    const keyChordsSerialized: Array<NiaKeyChordSerialized> = this.keyChords
      .map((keyChord: NiaKeyChord) => keyChord.serialize())

    return {
      keyChordsSerialized
    }
  }

  static deserialize(serialized: NiaRemoveMappingEventSerialized): NiaRemoveMappingEvent {
    const args: NiaRemoveMappingEventObject = {
      keyChords: serialized.keyChordsSerialized
        .map((keyChordSerialized) => NiaKeyChord.deserialize(keyChordSerialized))
    }

    return new NiaRemoveMappingEvent(args)
  }
}
