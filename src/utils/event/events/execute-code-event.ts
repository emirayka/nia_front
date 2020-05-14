import {
  NiaEvent, NiaEventType,
} from '@/utils/event'
import SerializableObject from '@/utils/serializable-object'

export interface NiaExecuteCodeEventObject {
  code: string
}

export type NiaExecuteCodeEventSerialized = NiaExecuteCodeEventObject

export class NiaExecuteCodeEvent implements SerializableObject<NiaExecuteCodeEvent, NiaExecuteCodeEventSerialized> {
  private readonly code: string

  constructor(args: NiaExecuteCodeEventObject) {
    this.code = args.code
  }

  getCode(): string {
    return this.code
  }

  getEventType(): NiaEventType {
    return NiaEventType.ExecuteCode
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }

  serialize(): NiaExecuteCodeEventSerialized {
    return {
      code: this.code
    }
  }

  static deserialize(obj: NiaExecuteCodeEventSerialized): NiaExecuteCodeEvent {
    const args: NiaExecuteCodeEventObject = obj

    return new NiaExecuteCodeEvent(args)
  }
}