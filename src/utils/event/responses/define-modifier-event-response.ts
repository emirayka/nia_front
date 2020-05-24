import {
  NiaDefineDeviceEvent,
  NiaDefineModifierEvent,
  NiaDefineModifierEventObject,
  NiaDefineModifierResponse,
  NiaEventResponse,
  NiaKey,
  NiaKeyObject,
  NiaModifierDescription,
  NiaModifierDescriptionObject,
  NiaModifierDescriptionSerialized,
} from '@/utils'

import SerializableObject from '@/utils/serializable-object'

export interface NiaDefineModifierEventResponseObject {
  modifier: NiaModifierDescription,

  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export interface NiaDefineModifierEventResponseSerialized {
  modifierSerialized: NiaModifierDescriptionSerialized

  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaDefineModifierEventResponse implements SerializableObject<NiaDefineModifierEventResponse, NiaDefineModifierEventResponseSerialized> {
  private readonly modifier: NiaModifierDescription

  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaDefineModifierEventResponseObject) {
    this.modifier = args.modifier

    this.message = args.message
    this.success = args.success
    this.error = args.error
    this.failure = args.failure
  }

  static from(event: NiaDefineModifierEvent, response: NiaDefineModifierResponse): NiaDefineModifierEventResponse {
    const args: NiaDefineModifierEventResponseObject = {
      modifier: event.getModifier(),

      message: response.getMessage(),
      success: response.isSuccess(),
      error: response.isError(),
      failure: response.isFailure(),
    }

    return new NiaDefineModifierEventResponse(args)
  }

  getModifier(): NiaModifierDescription {
    return this.modifier
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

  static deserialize(serialized: NiaDefineModifierEventResponseSerialized): NiaDefineModifierEventResponse {
    const args: NiaDefineModifierEventResponseObject = {
      modifier: NiaModifierDescription.deserialize(serialized.modifierSerialized),

      message: serialized.message,
      success: serialized.success,
      error: serialized.error,
      failure: serialized.failure
    }

    return new NiaDefineModifierEventResponse(args)
  }

  serialize(): NiaDefineModifierEventResponseSerialized {
    return {
      modifierSerialized: this.modifier.serialize(),

      message: this.message,
      success: this.success,
      error: this.error,
      failure: this.failure,
    }
  }
}