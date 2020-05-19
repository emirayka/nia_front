import {
  NiaRemoveDeviceEvent,
  NiaEventResponse, NiaRemoveDeviceEventObject, NiaRemoveModifierResponse,
} from '@/utils'
import SerializableObject from '@/utils/serializable-object'
import {NiaRemoveDeviceByPathResponse} from '@/utils/protocol/responses/remove-device-by-path-response'

export interface NiaRemoveDeviceResponseObject {
  devicePath: string
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export type NiaRemoveDeviceResponseSerialized = NiaRemoveDeviceResponseObject

export class NiaRemoveDeviceEventResponse implements SerializableObject<NiaRemoveDeviceEventResponse, NiaRemoveDeviceResponseObject> {
  private readonly devicePath: string

  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaRemoveDeviceResponseObject) {
    this.devicePath = args.devicePath
    this.message = args.message
    this.success = args.success
    this.error = args.error
    this.failure = args.failure
  }

  static from(event: NiaRemoveDeviceEvent, response: NiaRemoveDeviceByPathResponse): NiaRemoveDeviceEventResponse {
    const args: NiaRemoveDeviceResponseObject = {
      devicePath: event.getDevicePath(),

      message: response.getMessage(),
      success: response.isSuccess(),
      error: response.isSuccess(),
      failure: response.isFailure(),
    }

    return new NiaRemoveDeviceEventResponse(args)
  }

  getDevicePath(): string {
    return this.devicePath
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

  static deserialize(serialized: NiaRemoveDeviceResponseObject): NiaRemoveDeviceEventResponse {
    return new NiaRemoveDeviceEventResponse(serialized)
  }

  serialize(): NiaRemoveDeviceResponseSerialized {
    return {
      devicePath: this.devicePath,
      message: this.message,
      success: this.success,
      error: this.error,
      failure: this.failure,
    }
  }
}
