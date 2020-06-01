import {
  NiaEventResponse,
} from '@/utils'
import {
  ExecutionResult
} from '@/store/models'

import serializable from '@/utils/serializable-object'
import {NiaStopListeningEvent} from '@/utils/event/events/stop-listening-event'
import {NiaStopListeningResponse} from '@/utils/protocol/responses/stop-listening-response'

export interface NiaStopListeningEventResponseObject {
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export type NiaStopListeningEventResponseSerialized = NiaStopListeningEventResponseObject

export class NiaStopListeningEventResponse implements serializable<NiaStopListeningEventResponse, NiaStopListeningEventResponseObject> {
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaStopListeningEventResponseObject) {
    this.message = args.message
    this.success = args.success
    this.error = args.error
    this.failure = args.failure
  }

  toExecutionResult(): ExecutionResult {
    return {
      code: ``,
      result: this.message,
      success: this.success,
      error: this.error,
      failure: this.failure,
    }
  }

  static from(event: NiaStopListeningEvent, response: NiaStopListeningResponse): NiaStopListeningEventResponse {
    const args: NiaStopListeningEventResponseObject = {
      message: response.getMessage(),
      success: response.isSuccess(),
      error: response.isError(),
      failure: response.isFailure(),
    }

    return new NiaStopListeningEventResponse(args)
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

  static deserialize(obj: NiaStopListeningEventResponseObject): NiaStopListeningEventResponse {
    return new NiaStopListeningEventResponse(obj)
  }

  serialize(): NiaStopListeningEventResponseSerialized {
    return {
      message: this.message,
      success: this.success,
      error: this.error,
      failure: this.failure,
    }
  }
}
