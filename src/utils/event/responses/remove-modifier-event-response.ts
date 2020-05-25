import {
  NiaRemoveModifierEvent,
  NiaEventResponse,
  NiaRemoveModifierEventObject,
  NiaModifierDescription,
  NiaKey,
  NiaRemoveModifierResponse,
  NiaKeyObject,
} from '@/utils'

import SerializableObject from '@/utils/serializable-object'

export interface NiaRemoveModifierEventResponseObject {
  deviceId: number
  keyCode: number

  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export type NiaRemoveModifierEventResponseSerialized = NiaRemoveModifierEventResponseObject

export class NiaRemoveModifierEventResponse implements SerializableObject<NiaRemoveModifierEventResponse, NiaRemoveModifierEventResponseObject> {
  private readonly deviceId: number
  private readonly keyCode: number

  private readonly message: string
  private readonly failure: boolean
  private readonly error: boolean
  private readonly success: boolean

  constructor(args: NiaRemoveModifierEventResponseObject) {
    this.deviceId = args.deviceId
    this.keyCode = args.keyCode

    this.message = args.message
    this.failure = args.failure
    this.error = args.error
    this.success = args.success
  }

  static from(event: NiaRemoveModifierEvent, response: NiaRemoveModifierResponse): NiaRemoveModifierEventResponse {
    const args: NiaRemoveModifierEventResponseObject = {
      deviceId: event.getDeviceId() ?? 0, // todo: fix
      keyCode: event.getKeyCode(),

      message: response.getMessage(),
      success: response.isSuccess(),
      error: response.isError(),
      failure: response.isFailure(),
    }

    return new NiaRemoveModifierEventResponse(args)
  }

  getDeviceId(): number {
    return this.deviceId
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

  isError(): boolean {
    return this.error
  }

  isSuccess(): boolean {
    return this.success
  }

  toEventResponse(): NiaEventResponse {
    const niaEventResponse = new NiaEventResponse(this)

    return niaEventResponse
  }

  toModifierKey(): NiaKey {
    return new NiaKey({
      keyCode: this.keyCode,
      deviceId: this.deviceId
    })
  }

  static deserialize(obj: NiaRemoveModifierEventResponseObject): NiaRemoveModifierEventResponse {
    return new NiaRemoveModifierEventResponse(obj)
  }

  serialize(): NiaRemoveModifierEventResponseSerialized {
    return {
      deviceId: this.deviceId,
      keyCode: this.keyCode,
      message: this.message,
      success: this.success,
      error: this.error,
      failure: this.failure,
    }
  }
}
