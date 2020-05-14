import {
  NiaExecuteCodeEvent,
  NiaEventResponse, NiaExecuteCodeEventObject, NiaExecuteCodeResponse,
} from '@/utils'
import {
  ExecutionResult
} from '@/store/models'

import serializable from '@/utils/serializable-object'

export interface NiaExecuteCodeEventResponseObject {
  code: string
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export type NiaExecuteCodeEventResponseSerialized = NiaExecuteCodeEventResponseObject

export class NiaExecuteCodeEventResponse implements serializable<NiaExecuteCodeEventResponse, NiaExecuteCodeEventResponseObject> {
  private readonly code: string

  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaExecuteCodeEventResponseObject) {
    this.code = args.code

    this.message = args.message
    this.success = args.success
    this.error = args.error
    this.failure = args.failure
  }

  static from(event: NiaExecuteCodeEvent, response: NiaExecuteCodeResponse): NiaExecuteCodeEventResponse {
    const args: NiaExecuteCodeEventResponseObject = {
      code: event.getCode(),
      message: response.getMessage(),
      success: response.isSuccess(),
      error: response.isError(),
      failure: response.isFailure(),
    }

    return new NiaExecuteCodeEventResponse(args)
  }

  getCode(): string {
    return this.code
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

  toExecutionResult(): ExecutionResult {
    return {
      message: this.message,
      failure: this.failure,
      error: this.error,
      success: this.success,
    }
  }

  static deserialize(obj: NiaExecuteCodeEventResponseObject): NiaExecuteCodeEventResponse {
    return new NiaExecuteCodeEventResponse(obj)
  }

  serialize(): NiaExecuteCodeEventResponseSerialized {
    return {
      code: this.code,
      message: this.message,
      success: this.success,
      error: this.error,
      failure: this.failure,
    }
  }
}
