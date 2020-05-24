import {
  NiaMapping,
  NiaRemoveDeviceEvent,
  NiaEventResponse, NiaKey, NiaKeyObject, NiaMappingSerialized,
  NiaRemoveMappingEvent,
  NiaRemoveMappingResponse, NiaKeyChord,
} from '@/utils'

import SerializableObject from '@/utils/serializable-object'

export interface NiaRemoveMappingEventResponseObject {
  keyChords: Array<NiaKeyChord>

  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export type NiaRemoveMappingEventResponseSerialized = {
  keyChords: Array<NiaKeyChord>

  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaRemoveMappingEventResponse implements SerializableObject<NiaRemoveMappingEventResponse, NiaRemoveMappingEventResponseSerialized> {
  private readonly keyChords: Array<NiaKeyChord>

  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaRemoveMappingEventResponseObject) {
    this.keyChords = args.keyChords
    this.message = args.message
    this.success = args.success
    this.error = args.error
    this.failure = args.failure
  }

  static from(
    event: NiaRemoveMappingEvent,
    response: NiaRemoveMappingResponse,
  ): NiaRemoveMappingEventResponse {
    const args: NiaRemoveMappingEventResponseObject = {
      keyChords: event.getKeyChords(),

      message: response.getMessage(),
      success: response.isSuccess(),
      error: response.isError(),
      failure: response.isFailure(),
    }

    return new NiaRemoveMappingEventResponse(args)
  }

  getKeyChords(): Array<NiaKeyChord> {
    return this.keyChords
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

  static deserialize(serialized: NiaRemoveMappingEventResponseSerialized): NiaRemoveMappingEventResponse {
    const args: NiaRemoveMappingEventResponseObject = serialized

    return new NiaRemoveMappingEventResponse(args)
  }

  serialize(): NiaRemoveMappingEventResponseObject {
    return {
      keyChords: this.keyChords,

      message: this.message,
      success: this.success,
      error: this.error,
      failure: this.failure,
    }
  }
}
