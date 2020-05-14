import {
  NiaDefineDeviceEvent,
  NiaDefineModifierEvent, NiaDefineModifierEventObject, NiaDefineModifierResponse,
  NiaEventResponse, NiaKey, NiaKeyObject, NiaModifierDescription, NiaModifierDescriptionObject,
} from '@/utils'

import SerializableObject from '@/utils/serializable-object'

export interface NiaDefineModifierEventResponseObject {
  deviceId: number
  keyCode: number
  modifierAlias: string
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export type NiaDefineModifierEventResponseSerialized = NiaDefineModifierEventResponseObject

export class NiaDefineModifierEventResponse implements SerializableObject<NiaDefineModifierEventResponse, NiaDefineModifierEventResponseSerialized> {
  private readonly deviceId: number
  private readonly keyCode: number
  private readonly modifierAlias: string

  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaDefineModifierEventResponseObject) {
    this.deviceId = args.deviceId
    this.keyCode = args.keyCode
    this.modifierAlias = args.modifierAlias

    this.message = args.message
    this.success = args.success
    this.error = args.error
    this.failure = args.failure
  }

  static from(event: NiaDefineModifierEvent, response: NiaDefineModifierResponse): NiaDefineModifierEventResponse {
    const args: NiaDefineModifierEventResponseObject = {
      deviceId: event.getDeviceId(),
      keyCode: event.getKeyCode(),
      modifierAlias: event.getModifierAlias(),

      message: response.getMessage(),
      success: response.isSuccess(),
      error: response.isError(),
      failure: response.isFailure(),
    }

    return new NiaDefineModifierEventResponse(args)
  }

  getDeviceId(): number {
    return this.deviceId
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

  toModifier(): NiaModifierDescription {
    const key: NiaKey = new NiaKey({
      keyCode: this.keyCode,
      deviceId: this.deviceId
    })

    return new NiaModifierDescription({
      key,
      alias: this.modifierAlias
    })
  }

  static deserialize(serialized: NiaDefineModifierEventResponseSerialized): NiaDefineModifierEventResponse {
    const args: NiaDefineModifierEventResponseObject = serialized

    return new NiaDefineModifierEventResponse(args)
  }

  serialize(): NiaDefineModifierEventResponseObject {
    return {
      deviceId: this.deviceId,
      keyCode: this.keyCode,
      modifierAlias: this.modifierAlias,

      message: this.message,
      success: this.success,
      error: this.error,
      failure: this.failure,
    }
  }
}