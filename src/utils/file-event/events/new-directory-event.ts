import {NiaFileEvent} from '@/utils/file-event/events/file-event'
import {NiaFileEventInterface} from '@/utils/file-event/nia-file-event-interface'
import {
  NiaFileEventType
} from '@/utils'
import SerializableObject from '@/utils/serializable-object'

export interface NiaNewDirectoryEventObject {
  fullPath: string
}

export type NiaNewDirectoryEventSerialized = NiaNewDirectoryEventObject

export class NiaNewDirectoryEvent implements NiaFileEventInterface,
  SerializableObject<NiaNewDirectoryEvent, NiaNewDirectoryEventSerialized> {
  private readonly fullPath: string

  constructor(args: NiaNewDirectoryEventObject) {
    this.fullPath = args.fullPath
  }

  getEventType(): NiaFileEventType {
    return NiaFileEventType.NewDirectory
  }

  toFileEvent(): NiaFileEvent {
    const niaEvent = new NiaFileEvent(this)

    return niaEvent
  }

  getFullPath(): string {
    return this.fullPath
  }

  serialize(): NiaNewDirectoryEventSerialized {
    return {
      fullPath: this.fullPath
    }
  }

  static deserialize(obj: NiaNewDirectoryEventSerialized): NiaNewDirectoryEvent {
    const args: NiaNewDirectoryEventObject = obj

    return new NiaNewDirectoryEvent(args)
  }
}
