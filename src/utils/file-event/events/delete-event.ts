import {NiaFileEvent} from '@/utils/file-event/events/file-event'
import {NiaFileEventInterface} from '@/utils/file-event/nia-file-event-interface'
import {
  NiaFileEventType
} from '@/utils'
import SerializableObject from '@/utils/serializable-object'

export interface NiaDeleteEventObject {
  paths: Array<string>
}

export type NiaDeleteEventSerialized = NiaDeleteEventObject

export class NiaDeleteEvent implements NiaFileEventInterface,
  SerializableObject<NiaDeleteEvent, NiaDeleteEventSerialized> {
  private readonly paths: Array<string>

  constructor(args: NiaDeleteEventObject) {
    this.paths = args.paths
  }

  getEventType(): NiaFileEventType {
    return NiaFileEventType.Delete
  }

  toFileEvent(): NiaFileEvent {
    const niaEvent = new NiaFileEvent(this)

    return niaEvent
  }

  getPaths(): Array<string> {
    return this.paths
  }

  serialize(): NiaDeleteEventSerialized {
    return {
      paths: this.paths
    }
  }

  static deserialize(obj: NiaDeleteEventSerialized): NiaDeleteEvent {
    const args: NiaDeleteEventObject = obj

    return new NiaDeleteEvent(args)
  }
}
