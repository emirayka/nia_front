import serializable from '@/utils/serializable-object'
import {ExecutionResult} from '@/store/models'
import {NiaEventResponse, NiaExecuteCodeResponse} from '@/utils'
import {NiaExecuteTerminalCodeEvent} from '@/utils/event/events/execute-terminal-code-event'

export interface NiaExecuteTerminalCodeEventResponseObject {
  code: string
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export type NiaExecuteTerminalCodeEventResponseSerialized = NiaExecuteTerminalCodeEventResponseObject

export class NiaExecuteTerminalCodeEventResponse implements serializable<NiaExecuteTerminalCodeEventResponse, NiaExecuteTerminalCodeEventResponseObject> {
  private readonly code: string

  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaExecuteTerminalCodeEventResponseObject) {
    this.code = args.code

    this.message = args.message
    this.success = args.success
    this.error = args.error
    this.failure = args.failure
  }

  static from(event: NiaExecuteTerminalCodeEvent, response: NiaExecuteCodeResponse): NiaExecuteTerminalCodeEventResponse {
    const args: NiaExecuteTerminalCodeEventResponseObject = {
      code: event.getCode(),
      message: response.getMessage(),
      success: response.isSuccess(),
      error: response.isError(),
      failure: response.isFailure(),
    }

    return new NiaExecuteTerminalCodeEventResponse(args)
  }

  getCode(): string {
    return this.code
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

  toExecutionResult(): ExecutionResult {
    return {
      code: this.code,
      result: this.message,
      failure: this.failure,
      error: this.error,
      success: this.success,
    }
  }

  static deserialize(obj: NiaExecuteTerminalCodeEventResponseObject): NiaExecuteTerminalCodeEventResponse {
    return new NiaExecuteTerminalCodeEventResponse(obj)
  }

  serialize(): NiaExecuteTerminalCodeEventResponseSerialized {
    return {
      code: this.code,
      message: this.message,
      success: this.success,
      error: this.error,
      failure: this.failure,
    }
  }
}
