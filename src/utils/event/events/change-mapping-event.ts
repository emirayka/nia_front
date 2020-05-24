import {
  NiaEvent, NiaEventType,
} from '@/utils/event'

import SerializableObject from '@/utils/serializable-object'
import {
  NiaAction,
  NiaActionSerialized,
  NiaKeyChord,
  NiaKeyChordSerialized,
  NiaMapping,
  NiaMappingSerialized,
} from '@/utils'

export interface NiaChangeMappingEventObject {
  keyChords: Array<NiaKeyChord>,
  action: NiaAction
}

export type NiaChangeMappingEventSerialized = {
  keyChordsSerialized: Array<NiaKeyChordSerialized>,
  actionSerialized: NiaActionSerialized
}

export class NiaChangeMappingEvent implements SerializableObject<NiaChangeMappingEvent, NiaChangeMappingEventSerialized> {
  private readonly keyChords: Array<NiaKeyChord>
  private readonly action: NiaAction

  constructor(args: NiaChangeMappingEventObject) {
    this.keyChords = args.keyChords
    this.action = args.action
  }

  getKeyChords(): Array<NiaKeyChord> {
    return this.keyChords
  }

  getAction(): NiaAction {
    return this.action
  }

  getEventType(): NiaEventType {
    return NiaEventType.ChangeMapping
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }

  serialize(): NiaChangeMappingEventSerialized {
    return {
      keyChordsSerialized: this.keyChords.map((keyChord) => keyChord.serialize()),
      actionSerialized: this.action.serialize()
    }
  }

  static deserialize(serialized: NiaChangeMappingEventSerialized): NiaChangeMappingEvent {
    const args: NiaChangeMappingEventObject = {
      keyChords: serialized.keyChordsSerialized
        .map((keyChordSerialized) => NiaKeyChord.deserialize(keyChordSerialized)),
      action: NiaAction.deserialize(serialized.actionSerialized)
    }

    return new NiaChangeMappingEvent(args)
  }
}
