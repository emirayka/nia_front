import {
  NiaEvent
} from '@/utils/event'
import {NiaDefineModifierEventSerialized} from '@/utils/event/events/define-modifier-event'
import SerializableObject from '../../serializableObj'

export interface NiaExecuteCodeEventSerialized {
  code: string
}

export class NiaExecuteCodeEvent implements SerializableObject<NiaExecuteCodeEvent, NiaExecuteCodeEventSerialized> {
  private readonly code: string

  constructor(code: string) {
    this.code = code
  }

  getCode(): string {
    return this.code
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
    return new NiaExecuteCodeEvent(
      obj.code,
    )
  }
}