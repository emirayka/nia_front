import {
  NiaEventResponse,
} from '@/utils'
import {
  ExecutionResult
} from '@/store/models'

import serializable from '@/utils/serializable-object'
import {NiaStartListeningEvent} from '@/utils/event/events/start-listening-event'
import {NiaStartListeningResponse} from '@/utils/protocol/responses/start-listening-response'

export interface NiaStartListeningEventResponseObject {
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export type NiaStartListeningEventResponseSerialized = NiaStartListeningEventResponseObject

export class NiaStartListeningEventResponse implements serializable<NiaStartListeningEventResponse, NiaStartListeningEventResponseObject> {
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaStartListeningEventResponseObject) {
    this.message = args.message
    this.success = args.success
    this.error = args.error
    this.failure = args.failure
  }

  static from(event: NiaStartListeningEvent, response: NiaStartListeningResponse): NiaStartListeningEventResponse {
    const args: NiaStartListeningEventResponseObject = {
      message: response.getMessage(),
      success: response.isSuccess(),
      error: response.isError(),
      failure: response.isFailure(),
    }

    return new NiaStartListeningEventResponse(args)
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

  static deserialize(obj: NiaStartListeningEventResponseObject): NiaStartListeningEventResponse {
    return new NiaStartListeningEventResponse(obj)
  }

  serialize(): NiaStartListeningEventResponseSerialized {
    return {
      message: this.message,
      success: this.success,
      error: this.error,
      failure: this.failure,
    }
  }
}
