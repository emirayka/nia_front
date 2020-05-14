import {
  NiaDefineKeyboardEvent, NiaDefineKeyboardResult,
  NiaDefineModifierEvent, NiaDefineModifierEventSerialized,
  NiaDefineModifierResult, NiaDefineModifierResultSerialized,
  NiaEventResponse,
} from '@/utils'
import SerializableObject from '../../serializableObj'
import {Modifier} from '@/store/models/modifier'

export interface NiaDefineModifierEventResponseSerialized {
  defineModifierEventSerialized: NiaDefineModifierEventSerialized,
  defineModifierResultSerialized: NiaDefineModifierResultSerialized,
}

export class NiaDefineModifierEventResponse implements SerializableObject<NiaDefineModifierEventResponse, NiaDefineModifierEventResponseSerialized> {
  private readonly keyboardPath: string
  private readonly keyCode: number
  private readonly modifierAlias: string

  private readonly message: string
  private readonly failure: boolean
  private readonly error: boolean
  private readonly success: boolean

  constructor(defineModifierEvent: NiaDefineModifierEvent, defineModifierResult: NiaDefineModifierResult) {
    this.keyboardPath = defineModifierEvent.getKeyboardPath()
    this.keyCode = defineModifierEvent.getKeyCode()
    this.modifierAlias = defineModifierEvent.getModifierAlias()

    this.message = defineModifierResult.getMessage()
    this.failure = defineModifierResult.getFailure()
    this.error = defineModifierResult.getError()
    this.success = defineModifierResult.getSuccess()
  }

  getKeyboardPath(): string {
    return this.keyboardPath
  }

  getKeyCode(): number {
    return this.keyCode
  }

  getModifierAlias(): string {
    return this.modifierAlias
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
      modifierAlias: this.modifierAlias
    }
  }

  static deserialize(serialized: NiaDefineModifierEventResponseSerialized): NiaDefineModifierEventResponse {
    return new NiaDefineModifierEventResponse(
      NiaDefineModifierEvent.deserialize(serialized.defineModifierEventSerialized),
      NiaDefineModifierResult.deserialize(serialized.defineModifierResultSerialized),
    )
  }

  serialize(): NiaDefineModifierEventResponseSerialized {
    const defineModifierEventSerialized: NiaDefineModifierEventSerialized = {
      keyCode: this.keyCode,
      keyboardPath: this.keyboardPath,
      modifierAlias: this.modifierAlias
    }

    const defineModifierResultSerialized: NiaDefineModifierResultSerialized = {
      message: this.message,
      failure: this.failure,
      error: this.error,
      success: this.success
    }

    return {
      defineModifierEventSerialized,
      defineModifierResultSerialized
    }
  }
}