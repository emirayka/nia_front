import {ok, err, Result} from 'neverthrow'

import {
  ExecuteCodeResponse,
  Response,
} from 'nia-protocol-js'

import InvalidResponse from '@/background-utils/error/invalid-response'
import BasicError from '@/background-utils/error/basic-error.js'
import {
  NiaExecuteCodeResult,
} from '@/background-utils/protocol/domain'

class NiaExecuteCodeSuccessResult {
  message: string

  private constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }

  static from(successResult: ExecuteCodeResponse.SuccessResult): NiaExecuteCodeSuccessResult {
    const executionResult: string = successResult.getMessage()

    return new NiaExecuteCodeSuccessResult(executionResult)
  }
}

class NiaExecuteCodeErrorResult {
  message: string;

  constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }

  static from(errorResult: ExecuteCodeResponse.ErrorResult): NiaExecuteCodeErrorResult {
    const message: string = errorResult.getMessage()

    return new NiaExecuteCodeErrorResult(message)
  }
}

class NiaExecuteCodeFailureResult {
  message: string;

  constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }

  static from(failureResult: ExecuteCodeResponse.FailureResult): NiaExecuteCodeFailureResult {
    const message: string = failureResult.getMessage()

    return new NiaExecuteCodeFailureResult(message)
  }
}

export default class NiaExecuteCodeResponse {
  response: NiaExecuteCodeSuccessResult | NiaExecuteCodeErrorResult | NiaExecuteCodeFailureResult;

  constructor(response: NiaExecuteCodeSuccessResult | NiaExecuteCodeErrorResult | NiaExecuteCodeFailureResult) {
    this.response = response
  }

  isSuccess(): boolean {
    return this.response instanceof NiaExecuteCodeSuccessResult
  }

  isError(): boolean {
    return this.response instanceof NiaExecuteCodeErrorResult
  }

  isFailure(): boolean {
    return this.response instanceof NiaExecuteCodeFailureResult
  }

  getMessage(): string {
    return this.response.getMessage()
  }

  toResult(): Result<NiaExecuteCodeResult, InvalidResponse> {
    const success: boolean = this.isSuccess()
    const error: boolean = this.isError()
    const failure: boolean = this.isFailure()
    const message: string = this.getMessage();

    const result: NiaExecuteCodeResult = {
      success,
      error,
      failure,
      message,
    }

    return ok(result)
  }

  static from(executeCodeResponse: ExecuteCodeResponse): Result<NiaExecuteCodeResponse, InvalidResponse> {
    if (executeCodeResponse.getResultCase() === ExecuteCodeResponse.ResultCase.SUCCESS_RESULT) {
      const successResult: ExecuteCodeResponse.SuccessResult | undefined = executeCodeResponse.getSuccessResult()

      if (successResult === undefined) {
        return err(new InvalidResponse('Success result was not set.'))
      }

      const niaExecuteCodeSuccessResponse: NiaExecuteCodeSuccessResult = NiaExecuteCodeSuccessResult.from(successResult)
      return ok(new NiaExecuteCodeResponse(niaExecuteCodeSuccessResponse))
    } else if (executeCodeResponse.getResultCase() === ExecuteCodeResponse.ResultCase.ERROR_RESULT) {
      const errorResult: ExecuteCodeResponse.ErrorResult | undefined = executeCodeResponse.getErrorResult()

      if (errorResult === undefined) {
        return err(new InvalidResponse('Error result was not set.'))
      }

      const niaExecuteCodeErrorResponse: NiaExecuteCodeErrorResult = NiaExecuteCodeErrorResult.from(errorResult)

      return ok(new NiaExecuteCodeResponse(niaExecuteCodeErrorResponse))
    } else if (executeCodeResponse.getResultCase() === ExecuteCodeResponse.ResultCase.FAILURE_RESULT) {
      const failureResult: ExecuteCodeResponse.FailureResult | undefined = executeCodeResponse.getFailureResult()

      if (failureResult === undefined) {
        return err(new InvalidResponse('Failure result was not set'))
      }

      const niaExecuteCodeFailureResult: NiaExecuteCodeFailureResult = NiaExecuteCodeFailureResult.from(failureResult)

      return ok(new NiaExecuteCodeResponse(niaExecuteCodeFailureResult))
    }

    return err(new InvalidResponse('Unknown result'))
  }

  static fromResponse(response: Response): Result<NiaExecuteCodeResponse, InvalidResponse> {
    if (response.getRequestCase() !== Response.RequestCase.EXECUTE_CODE_RESPONSE) {
      return err(new InvalidResponse('Invalid response. Expected Execute Code Response.'))
    }

    const executeCodeResponse: ExecuteCodeResponse | undefined = response.getExecuteCodeResponse()

    if (executeCodeResponse === undefined) {
      return err(new InvalidResponse('Execute Code response was not set'))
    }

    return NiaExecuteCodeResponse.from(executeCodeResponse)
  }

  static fromUInt8Array(data: Uint8Array): Result<NiaExecuteCodeResponse, InvalidResponse> {
    const response: Response = Response.deserializeBinary(data)

    return NiaExecuteCodeResponse.fromResponse(response)
  }
}