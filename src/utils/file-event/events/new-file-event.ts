import {NiaFileEvent} from '@/utils/file-event/events/file-event'
import {NiaFileEventInterface} from '@/utils/file-event/nia-file-event-interface'
import {
  NiaFileEventType
} from '@/utils'
import SerializableObject from '@/utils/serializable-object'

export interface NiaNewFileEventObject {
  fullPath: string
}

export type NiaNewFileEventSerialized = NiaNewFileEventObject

export class NiaNewFileEvent implements NiaFileEventInterface,
  SerializableObject<NiaNewFileEvent, NiaNewFileEventSerialized> {
  private readonly fullPath: string

  constructor(args: NiaNewFileEventObject) {
    this.fullPath = args.fullPath
  }

  getEventType(): NiaFileEventType {
    return NiaFileEventType.NewFile
  }

  toFileEvent(): NiaFileEvent {
    const niaEvent = new NiaFileEvent(this)

    return niaEvent
  }

  getFullPath(): string {
    return this.fullPath
  }

  serialize(): NiaNewFileEventSerialized {
    return {
      fullPath: this.fullPath
    }
  }

  static deserialize(obj: NiaNewFileEventSerialized): NiaNewFileEvent {
    const args: NiaNewFileEventObject = obj

    return new NiaNewFileEvent(args)
  }
}
