import {
  ExecuteCodeResponse,
  Response,
} from 'nia-protocol-js'

import {
  NiaExecuteCodeResult,
  InvalidResponseError,
} from '@/utils'
import {NiaResponseType} from '@/utils/protocol/response'

export interface NiaExecuteCodeResponseObject {
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaExecuteCodeResponse {
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaExecuteCodeResponseObject) {
    this.message = args.message
    this.success = args.success
    this.error = args.error
    this.failure = args.failure
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
    return this.failure
  }

  getType(): NiaResponseType {
    return NiaResponseType.ExecuteCode
  }

  static fromPB(executeCodeResponsePB: ExecuteCodeResponse): NiaExecuteCodeResponse {
    let message: string = ''
    let success: boolean = false
    let error: boolean = false
    let failure: boolean = false

    switch (executeCodeResponsePB.getResultCase()) {
      case ExecuteCodeResponse.ResultCase.SUCCESS_RESULT:
        message = executeCodeResponsePB.getSuccessResult()?.getMessage() ?? ''
        success = true
        break;
      case ExecuteCodeResponse.ResultCase.ERROR_RESULT:
        message = executeCodeResponsePB.getErrorResult()?.getMessage() ?? ''
        error = true
        break;
      case ExecuteCodeResponse.ResultCase.FAILURE_RESULT:
        message = executeCodeResponsePB.getFailureResult()?.getMessage() ?? ''
        failure = true
        break;
    }

    const args: NiaExecuteCodeResponseObject = {
      message,
      success,
      error,
      failure
    }

    return new NiaExecuteCodeResponse(args)
  }
}

