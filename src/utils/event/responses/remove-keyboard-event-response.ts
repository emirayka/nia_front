import {
  NiaRemoveKeyboardEvent,
  NiaRemoveKeyboardByPathResult,
  NiaEventResponse, NiaRemoveKeyboardEventSerialized, NiaRemoveKeyboardByPathResultSerialized,
} from '@/utils'
import SerializableObject from '../../serializableObj'

export interface NiaRemoveKeyboardEventResponseSerialized {
  removeKeyboardEventSerialized: NiaRemoveKeyboardEventSerialized,
  removeKeyboardByPathResultSerialized: NiaRemoveKeyboardByPathResultSerialized
}

export class NiaRemoveKeyboardEventResponse implements SerializableObject<NiaRemoveKeyboardEventResponse, NiaRemoveKeyboardEventResponseSerialized> {
  private readonly keyboardPath: string

  private readonly message: string
  private readonly failure: boolean
  private readonly error: boolean
  private readonly success: boolean

  constructor(removeKeyboardEvent: NiaRemoveKeyboardEvent, removeKeyboardByPathResult: NiaRemoveKeyboardByPathResult) {
    this.keyboardPath = removeKeyboardEvent.getKeyboardPath()

    this.message = removeKeyboardByPathResult.getMessage()
    this.failure = removeKeyboardByPathResult.getFailure()
    this.error = removeKeyboardByPathResult.getError()
    this.success = removeKeyboardByPathResult.getSuccess()
  }


  getKeyboardPath(): string {
    return this.keyboardPath
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

  static deserialize(serialized: NiaRemoveKeyboardEventResponseSerialized): NiaRemoveKeyboardEventResponse {
    return new NiaRemoveKeyboardEventResponse(
      NiaRemoveKeyboardEvent.deserialize(serialized.removeKeyboardEventSerialized),
      NiaRemoveKeyboardByPathResult.deserialize(serialized.removeKeyboardByPathResultSerialized)
    )
  }

  serialize(): NiaRemoveKeyboardEventResponseSerialized {
    const removeKeyboardEventSerialized: NiaRemoveKeyboardEventSerialized = {
      keyboardPath: this.keyboardPath,
    }
    const removeKeyboardByPathResultSerialized: NiaRemoveKeyboardByPathResultSerialized = {
      message: this.message,
      failure: this.failure,
      error: this.error,
      success: this.success,
    }

    return {
      removeKeyboardEventSerialized,
      removeKeyboardByPathResultSerialized
    }
  }
}
