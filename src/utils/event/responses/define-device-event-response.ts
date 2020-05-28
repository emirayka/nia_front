import {
  NiaDefineDeviceEvent,
  NiaEventResponse,
  NiaDefineDeviceEventObject,
} from '@/utils'
import serializable from '@/utils/serializable-object'
import {NiaDefineDeviceResponse} from '@/utils/protocol/responses/define-device-response'
import SerializableObject from '@/utils/serializable-object'

export interface NiaDefineDeviceEventResponseObject {
  deviceId: number
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export type NiaDefineDeviceEventResponseSerialized = NiaDefineDeviceEventResponseObject

export class NiaDefineDeviceEventResponse implements SerializableObject<NiaDefineDeviceEventResponse, NiaDefineDeviceEventResponseSerialized> {
  private readonly deviceId: number

  private readonly message: string
  private readonly failure: boolean
  private readonly error: boolean
  private readonly success: boolean

  constructor(args: NiaDefineDeviceEventResponseObject) {
    this.deviceId = args.deviceId
    this.message = args.message
    this.failure = args.failure
    this.error = args.error
    this.success = args.success
  }

  static from(event: NiaDefineDeviceEvent, response: NiaDefineDeviceResponse): NiaDefineDeviceEventResponse {
    const args: NiaDefineDeviceEventResponseObject = {
      deviceId: event.getDeviceId(),
      message: response.getMessage(),
      success: response.isSuccess(),
      error: response.isError(),
      failure: response.isFailure(),
    }

    return new NiaDefineDeviceEventResponse(args)
  }

  getDeviceId(): number {
    return this.deviceId
  }

  getMessage(): string {
    return this.message
  }

  isFailure(): boolean {
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

  static deserialize(obj: NiaDefineDeviceEventResponseSerialized): NiaDefineDeviceEventResponse {
    const args: NiaDefineDeviceEventResponseObject = obj

    return new NiaDefineDeviceEventResponse(args)
  }

  serialize(): NiaDefineDeviceEventResponseObject {
    return {
      deviceId: this.deviceId,
      message: this.message,
      success: this.success,
      error: this.error,
      failure: this.failure,
    }
  }
}