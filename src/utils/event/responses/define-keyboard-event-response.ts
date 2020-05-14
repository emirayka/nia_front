import {
  NiaDefineKeyboardRequest,
  NiaDefineKeyboardResult,
  NiaDefineKeyboardEvent,
  NiaEventResponse,
  NiaDefineKeyboardEventSerialized, NiaDefineKeyboardResultSerialized,
} from '@/utils'
import serializable from '../../serializableObj'

export interface NiaDefineKeyboardEventResponseSerialized {
  defineKeyboardEventSerialized: NiaDefineKeyboardEventSerialized,
  defineKeyboardResultSerialized: NiaDefineKeyboardResultSerialized,
}

export class NiaDefineKeyboardEventResponse implements serializable<NiaDefineKeyboardEventResponse, NiaDefineKeyboardEventResponseSerialized> {
  private readonly keyboardPath: string
  private readonly keyboardName: string

  private readonly message: string
  private readonly failure: boolean
  private readonly error: boolean
  private readonly success: boolean

  constructor(defineKeyboardEvent: NiaDefineKeyboardEvent, defineKeyboardResult: NiaDefineKeyboardResult) {
    this.keyboardPath = defineKeyboardEvent.getKeyboardPath()
    this.keyboardName = defineKeyboardEvent.getKeyboardName()

    this.message = defineKeyboardResult.getMessage()
    this.failure = defineKeyboardResult.getFailure()
    this.error = defineKeyboardResult.getError()
    this.success = defineKeyboardResult.getSuccess()
  }

  getKeyboardPath(): string {
    return this.keyboardPath
  }

  getKeyboardName(): string {
    return this.keyboardName
  }

  getMessage(): string {
    return this.message
  }

  getFailure(): boolean {
    return this.failure
  }

  getError(): boolean {
    return this.error
  }

  getSuccess(): boolean {
    return this.success
  }

  toEventResponse(): NiaEventResponse {
    const niaEventResponse = new NiaEventResponse(this)

    return niaEventResponse
  }

  static deserialize(serialized: NiaDefineKeyboardEventResponseSerialized): NiaDefineKeyboardEventResponse {
    return new NiaDefineKeyboardEventResponse(
      NiaDefineKeyboardEvent.deserialize(serialized.defineKeyboardEventSerialized),
      NiaDefineKeyboardResult.deserialize(serialized.defineKeyboardResultSerialized),
    )
  }

  serialize(): NiaDefineKeyboardEventResponseSerialized {
    const defineKeyboardEventSerialized: NiaDefineKeyboardEventSerialized = {
      keyboardName: this.keyboardName,
      keyboardPath: this.keyboardPath,
    }
    const defineKeyboardResultSerialized: NiaDefineKeyboardResultSerialized = {
      message: this.message,
      failure: this.failure,
      success: this.success,
      error: this.error,
    }

    return {
      defineKeyboardEventSerialized,
      defineKeyboardResultSerialized,
    }
  }
}