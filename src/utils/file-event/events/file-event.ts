import loggers from '@/utils/logger'

const logger = loggers('file-event')

import SerializableObject from '@/utils/serializable-object'
import {
  NiaFileEventType,
  NiaListConfigDirectoryEvent,
  NiaListConfigDirectoryEventSerialized,
  NiaOpenFileEvent,
  NiaOpenFileEventSerialized,
} from '@/utils'

import {NiaSaveFileEvent, NiaSaveFileEventSerialized} from '@/utils/file-event/events/save-file-event'
import {NiaNewFileEvent, NiaNewFileEventSerialized} from '@/utils/file-event/events/new-file-event'
import {NiaNewDirectoryEvent, NiaNewDirectoryEventSerialized} from '@/utils/file-event/events/new-directory-event'
import {NiaDeleteEvent, NiaDeleteEventSerialized} from '@/utils/file-event/events/delete-event'

export type NiaFileEventUnderlyingTypeSerialized =
  NiaListConfigDirectoryEventSerialized |
  NiaOpenFileEventSerialized |
  NiaSaveFileEventSerialized |
  NiaNewFileEventSerialized |
  NiaNewDirectoryEventSerialized |
  NiaNewDirectoryEventSerialized

export type NiaFileEventUnderlyingType =
  NiaListConfigDirectoryEvent |
  NiaOpenFileEvent |
  NiaSaveFileEvent |
  NiaNewFileEvent |
  NiaNewDirectoryEvent |
  NiaDeleteEvent

export interface NiaFileEventSerialized {
  eventType: NiaFileEventType,
  event: NiaFileEventUnderlyingTypeSerialized
}

export class NiaFileEvent implements SerializableObject<NiaFileEvent, NiaFileEventSerialized> {
  private readonly event: NiaFileEventUnderlyingType

  constructor(event: NiaFileEventUnderlyingType) {
    this.event = event
  }

  getEventType(): NiaFileEventType {
    return this.event.getEventType()
  }

  getEvent(): NiaFileEventUnderlyingType {
    return this.event
  }

  static deserialize(serialized: NiaFileEventSerialized): NiaFileEvent {
    logger.debug('Deserializing event:')
    logger.debug(serialized)

    switch (serialized.eventType) {
      case NiaFileEventType.ListConfigDirectory:
        return new NiaFileEvent(
          NiaListConfigDirectoryEvent.deserialize(serialized.event as NiaListConfigDirectoryEventSerialized),
        )

      case NiaFileEventType.OpenFile:
        return new NiaFileEvent(
          NiaOpenFileEvent.deserialize(serialized.event as NiaOpenFileEventSerialized),
        )

      case NiaFileEventType.SaveFile:
        return new NiaFileEvent(
          NiaSaveFileEvent.deserialize(serialized.event as NiaSaveFileEventSerialized),
        )

      case NiaFileEventType.NewFile:
        return new NiaFileEvent(
          NiaNewFileEvent.deserialize(serialized.event as NiaNewFileEventSerialized),
        )

      case NiaFileEventType.NewDirectory:
        return new NiaFileEvent(
          NiaNewDirectoryEvent.deserialize(serialized.event as NiaNewDirectoryEventSerialized),
        )

      case NiaFileEventType.Delete:
        return new NiaFileEvent(
          NiaDeleteEvent.deserialize(serialized.event as NiaDeleteEventSerialized),
        )
    }
  }

  serialize(): NiaFileEventSerialized {
    return {
      eventType: this.event.getEventType(),
      event: this.event.serialize(),
    }
  }
}
