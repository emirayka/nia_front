import {NiaFileEvent} from '@/utils/file-event/events/file-event'
import {NiaFileEventInterface} from '@/utils/file-event/nia-file-event-interface'
import {
  NiaFileEventType
} from '@/utils'
import SerializableObject from '@/utils/serializable-object'

export interface NiaSaveFileEventObject {
  fullPath: string,
  fileContent: string
}

export type NiaSaveFileEventSerialized = NiaSaveFileEventObject

export class NiaSaveFileEvent implements NiaFileEventInterface,
  SerializableObject<NiaSaveFileEvent, NiaSaveFileEventSerialized> {
  private readonly fullPath: string
  private readonly fileContent: string

  constructor(args: NiaSaveFileEventObject) {
    this.fullPath = args.fullPath
    this.fileContent = args.fileContent
  }

  getEventType(): NiaFileEventType {
    return NiaFileEventType.SaveFile
  }

  toFileEvent(): NiaFileEvent {
    const niaEvent = new NiaFileEvent(this)

    return niaEvent
  }

  getFullPath(): string {
    return this.fullPath
  }

  getFileContent(): string {
    return this.fileContent
  }

  serialize(): NiaSaveFileEventSerialized {
    return {
      fullPath: this.fullPath,
      fileContent: this.fileContent
    }
  }

  static deserialize(obj: NiaSaveFileEventSerialized): NiaSaveFileEvent {
    const args: NiaSaveFileEventObject = obj

    return new NiaSaveFileEvent(args)
  }
}
