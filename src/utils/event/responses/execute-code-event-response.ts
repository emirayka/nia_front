import {
  NiaExecuteCodeResult,
  NiaExecuteCodeEvent,
  NiaEventResponse, NiaExecuteCodeEventSerialized, NiaExecuteCodeResultSerialized,
} from '@/utils'
import {
  ExecutionResult
} from '@/store/models'
import serializable from '../../serializableObj'

export interface NiaExecuteCodeEventResponseSerialized {
  executeCodeEventSerialized: NiaExecuteCodeEventSerialized,
  executeCodeResultSerialized: NiaExecuteCodeResultSerialized,
}

export class NiaExecuteCodeEventResponse implements serializable<NiaExecuteCodeEventResponse, NiaExecuteCodeEventResponseSerialized> {
  private readonly code: string

  private readonly message: string
  private readonly failure: boolean
  private readonly error: boolean
  private readonly success: boolean

  constructor(executeCodeEvent: NiaExecuteCodeEvent, executeCodeResult: NiaExecuteCodeResult) {
    this.code = executeCodeEvent.getCode()

    this.message = executeCodeResult.getMessage()
    this.failure = executeCodeResult.getFailure()
    this.error = executeCodeResult.getError()
    this.success = executeCodeResult.getSuccess()
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
    } as ExecutionResult
  }

  static deserialize(serialized: NiaExecuteCodeEventResponseSerialized): NiaExecuteCodeEventResponse {
    return new NiaExecuteCodeEventResponse(
      NiaExecuteCodeEvent.deserialize(serialized.executeCodeEventSerialized),
      NiaExecuteCodeResult.deserialize(serialized.executeCodeResultSerialized)
    )
  }

  serialize(): NiaExecuteCodeEventResponseSerialized {
    const executeCodeEventSerialized: NiaExecuteCodeEventSerialized = {
      code: this.code,
    }

    const executeCodeResultSerialized: NiaExecuteCodeResultSerialized = {
      message: this.message,
      failure: this.failure,
      error: this.error,
      success: this.success,
    }

    return {
      executeCodeEventSerialized,
      executeCodeResultSerialized
    }
  }
}
