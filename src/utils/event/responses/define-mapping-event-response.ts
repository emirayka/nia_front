import {
  NiaMapping, NiaMappingSerialized,
  NiaDefineDeviceEvent,
  NiaEventResponse, NiaKey, NiaKeyObject,
  NiaDefineMappingEvent,
  NiaDefineMappingResponse,
} from '@/utils'

import SerializableObject from '@/utils/serializable-object'

export interface NiaDefineMappingEventResponseObject {
  mapping: NiaMapping

  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export type NiaDefineMappingEventResponseSerialized = {
  mappingSerialized: NiaMappingSerialized

  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaDefineMappingEventResponse implements SerializableObject<NiaDefineMappingEventResponse, NiaDefineMappingEventResponseSerialized> {
  private readonly mapping: NiaMapping
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaDefineMappingEventResponseObject) {
    this.mapping = args.mapping
    this.message = args.message
    this.success = args.success
    this.error = args.error
    this.failure = args.failure
  }

  static from(event: NiaDefineMappingEvent, response: NiaDefineMappingResponse): NiaDefineMappingEventResponse {
    const args: NiaDefineMappingEventResponseObject = {
      mapping: event.getMapping(),

      message: response.getMessage(),
      success: response.isSuccess(),
      error: response.isError(),
      failure: response.isFailure(),
    }

    return new NiaDefineMappingEventResponse(args)
  }

  getMapping(): NiaMapping {
    return this.mapping
  }

  getMessage(): string {
    return this.message
  }

  isSuccess(): boolean {
    return this.success
  }

  isError(): boolean {
    return this.error
  }

  isFailure(): boolean {
    return this.error
  }

  toEventResponse(): NiaEventResponse {
    const niaEventResponse = new NiaEventResponse(this)

    return niaEventResponse
  }

  static deserialize(serialized: NiaDefineMappingEventResponseSerialized): NiaDefineMappingEventResponse {
    const args: NiaDefineMappingEventResponseObject = {
      mapping: NiaMapping.deserialize(serialized.mappingSerialized),

      message: serialized.message,
      success: serialized.success,
      error: serialized.error,
      failure: serialized.failure,
    }

    return new NiaDefineMappingEventResponse(args)
  }

  serialize(): NiaDefineMappingEventResponseSerialized {
    return {
      mappingSerialized: this.mapping.serialize(),

      message: this.message,
      success: this.success,
      error: this.error,
      failure: this.failure,
    }
  }
}
