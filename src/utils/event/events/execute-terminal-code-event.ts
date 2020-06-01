import {
  NiaEvent, NiaEventType,
} from '@/utils/event'
import SerializableObject from '@/utils/serializable-object'

export interface NiaExecuteTerminalCodeEventObject {
  code: string
}

export type NiaExecuteTerminalCodeEventSerialized = NiaExecuteTerminalCodeEventObject

export class NiaExecuteTerminalCodeEvent implements SerializableObject<NiaExecuteTerminalCodeEvent, NiaExecuteTerminalCodeEventSerialized> {
  private readonly code: string

  constructor(args: NiaExecuteTerminalCodeEventObject) {
    this.code = args.code
  }

  getCode(): string {
    return this.code
  }

  getEventType(): NiaEventType {
    return NiaEventType.ExecuteTerminalCode
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }

  serialize(): NiaExecuteTerminalCodeEventSerialized {
    return {
      code: this.code
    }
  }

  static deserialize(obj: NiaExecuteTerminalCodeEventSerialized): NiaExecuteTerminalCodeEvent {
    const args: NiaExecuteTerminalCodeEventObject = obj

    return new NiaExecuteTerminalCodeEvent(args)
  }
}
