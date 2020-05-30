import SerializableObject from '@/utils/serializable-object'
import {NiaFileEvent} from '@/utils/file-event/events/file-event'
import {NiaFileEventInterface} from '@/utils/file-event/nia-file-event-interface'
import {NiaFileEventType} from '@/utils/file-event/events/file-event-type'

export interface NiaListConfigDirectoryEventObject {
}

export type NiaListConfigDirectoryEventSerialized = NiaListConfigDirectoryEventObject

export class NiaListConfigDirectoryEvent implements NiaFileEventInterface,
  SerializableObject<NiaListConfigDirectoryEvent, NiaListConfigDirectoryEventSerialized> {
  
  constructor(args: NiaListConfigDirectoryEventObject) {
  }

  getEventType(): NiaFileEventType {
    return NiaFileEventType.ListConfigDirectory
  }

  toFileEvent(): NiaFileEvent {
    const niaEvent = new NiaFileEvent(this)

    return niaEvent
  }

  serialize(): NiaListConfigDirectoryEventSerialized {
    return {}
  }

  static deserialize(obj: NiaListConfigDirectoryEventSerialized): NiaListConfigDirectoryEvent {
    const args: NiaListConfigDirectoryEventObject = obj

    return new NiaListConfigDirectoryEvent(args)
  }
}
