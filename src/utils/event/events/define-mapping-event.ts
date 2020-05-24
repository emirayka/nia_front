import {
  NiaEvent, NiaEventType,
} from '@/utils/event'

import SerializableObject from '@/utils/serializable-object'
import {NiaMapping, NiaMappingSerialized} from '@/utils'

export interface NiaDefineMappingEventObject {
  mapping: NiaMapping
}

export type NiaDefineMappingEventSerialized = {
  mappingSerialized: NiaMappingSerialized
}

export class NiaDefineMappingEvent implements SerializableObject<NiaDefineMappingEvent, NiaDefineMappingEventSerialized> {
  private readonly mapping: NiaMapping

  constructor(args: NiaDefineMappingEventObject) {
    this.mapping = args.mapping
  }

  getMapping(): NiaMapping {
    return this.mapping
  }

  getEventType(): NiaEventType {
    return NiaEventType.DefineMapping
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }

  serialize(): NiaDefineMappingEventSerialized {
    return {
      mappingSerialized: this.mapping.serialize()
    }
  }

  static deserialize(serialized: NiaDefineMappingEventSerialized): NiaDefineMappingEvent {
    const args: NiaDefineMappingEventObject = {
      mapping: NiaMapping.deserialize(serialized.mappingSerialized)
    }

    return new NiaDefineMappingEvent(args)
  }
}
