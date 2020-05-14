import {
  NiaRemoveModifierEvent,
  NiaRemoveModifierResult,
  NiaEventResponse, NiaRemoveModifierEventSerialized, NiaRemoveModifierResultSerialized,
} from '@/utils'
import SerializableObject from '../../serializableObj'
import {Modifier} from '@/store/models/modifier'

export interface NiaRemoveModifierEventResponseSerialized {
  removeModifierEventSerialized: NiaRemoveModifierEventSerialized,
  removeModifierResultSerialized: NiaRemoveModifierResultSerialized,
}

export class NiaRemoveModifierEventResponse implements SerializableObject<NiaRemoveModifierEventResponse, NiaRemoveModifierEventResponseSerialized> {
  private readonly keyboardPath: string
  private readonly keyCode: number

  private readonly message: string
  private readonly failure: boolean
  private readonly error: boolean
  private readonly success: boolean

  constructor(removeModifierEvent: NiaRemoveModifierEvent, removeModifierResult: NiaRemoveModifierResult) {
    this.keyboardPath = removeModifierEvent.getKeyboardPath()
    this.keyCode = removeModifierEvent.getKeyCode()

    this.message = removeModifierResult.getMessage()
    this.failure = removeModifierResult.getFailure()
    this.error = removeModifierResult.getError()
    this.success = removeModifierResult.getSuccess()
  }

  getKeyboardPath(): string {
    return this.keyboardPath
  }

  getKeyCode(): number {
    return this.keyCode
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

  toModifier(): Modifier {
    return {
      keyboardKey: {
        keyboardPath: this.keyboardPath,
        keyCode: this.keyCode
      },
      modifierAlias: '', // todo: fix?
    }
  }

  static deserialize(serialized: NiaRemoveModifierEventResponseSerialized): NiaRemoveModifierEventResponse {
    return new NiaRemoveModifierEventResponse(
      NiaRemoveModifierEvent.deserialize(serialized.removeModifierEventSerialized),
      NiaRemoveModifierResult.deserialize(serialized.removeModifierResultSerialized)
    )
  }

  serialize(): NiaRemoveModifierEventResponseSerialized {
    const removeModifierEventSerialized: NiaRemoveModifierEventSerialized = {
      keyCode: this.keyCode,
      keyboardPath: this.keyboardPath
    }
    const removeModifierResultSerialized: NiaRemoveModifierResultSerialized = {
      message: this.message,
      failure: this.failure,
      error: this.error,
      success: this.success,
    }

    return {
      removeModifierEventSerialized,
      removeModifierResultSerialized
    }
  }
}
