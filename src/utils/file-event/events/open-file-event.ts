import {NiaFileEvent} from '@/utils/file-event/events/file-event'
import {NiaFileEventInterface} from '@/utils/file-event/nia-file-event-interface'
import {
  NiaFileEventType
} from '@/utils'
import SerializableObject from '@/utils/serializable-object'

export interface NiaOpenFileEventObject {
  fullPath: string
}

export type NiaOpenFileEventSerialized = NiaOpenFileEventObject

export class NiaOpenFileEvent implements NiaFileEventInterface,
  SerializableObject<NiaOpenFileEvent, NiaOpenFileEventSerialized> {
  private readonly fullPath: string

  constructor(args: NiaOpenFileEventObject) {
    this.fullPath = args.fullPath
  }

  getEventType(): NiaFileEventType {
    return NiaFileEventType.OpenFile
  }

  toFileEvent(): NiaFileEvent {
    const niaEvent = new NiaFileEvent(this)

    return niaEvent
  }

  getFullPath(): string {
    return this.fullPath
  }

  serialize(): NiaOpenFileEventSerialized {
    return {
      fullPath: this.fullPath
    }
  }

  static deserialize(obj: NiaOpenFileEventSerialized): NiaOpenFileEvent {
    const args: NiaOpenFileEventObject = obj

    return new NiaOpenFileEvent(args)
  }
}
