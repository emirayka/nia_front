import {ok, err, Result} from 'neverthrow'

import {
  RemoveKeyboardByPathResponse,
  Response,
} from 'nia-protocol-js'
import {NiaRemoveKeyboardByPathResult} from '@/utils/protocol'
import InvalidResponse from '@/utils/error/invalid-response'

class NiaRemoveKeyboardByPathSuccessResult {
  message: string;

  constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }

  static from(successResult: RemoveKeyboardByPathResponse.SuccessResult): NiaRemoveKeyboardByPathSuccessResult {
    const message: string = successResult.getMessage()

    return new NiaRemoveKeyboardByPathSuccessResult(message)
  }
}

class NiaRemoveKeyboardByPathErrorResult {
  message: string;

  constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }

  static from(errorResult: RemoveKeyboardByPathResponse.ErrorResult): NiaRemoveKeyboardByPathErrorResult {
    const message: string = errorResult.getMessage()

    return new NiaRemoveKeyboardByPathErrorResult(message)
  }
}

class NiaRemoveKeyboardByPathFailureResult {
  message: string;

  constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }

  static from(failureResult: RemoveKeyboardByPathResponse.FailureResult): NiaRemoveKeyboardByPathFailureResult {
    const message: string = failureResult.getMessage()

    return new NiaRemoveKeyboardByPathFailureResult(message)
  }
}

export default class NiaRemoveKeyboardByPathResponse {
  response: NiaRemoveKeyboardByPathSuccessResult | NiaRemoveKeyboardByPathErrorResult | NiaRemoveKeyboardByPathFailureResult;

  constructor(response: NiaRemoveKeyboardByPathSuccessResult | NiaRemoveKeyboardByPathErrorResult | NiaRemoveKeyboardByPathFailureResult) {
    this.response = response
  }

  isSuccess(): boolean {
    return this.response instanceof NiaRemoveKeyboardByPathSuccessResult
  }

  isError(): boolean {
    return this.response instanceof NiaRemoveKeyboardByPathErrorResult
  }

  isFailure(): boolean {
    return this.response instanceof NiaRemoveKeyboardByPathFailureResult
  }

  getMessage(): string {
    return this.response.getMessage()
  }

  toResult(): Result<NiaRemoveKeyboardByPathResult, InvalidResponse> {
    const success: boolean = this.isSuccess()
    const error: boolean = this.isError()
    const failure: boolean = this.isFailure()
    const message: string = this.getMessage()

    const result: NiaRemoveKeyboardByPathResult = {
      success,
      error,
      failure,
      message,
    }

    return ok(result)
  }

  static from(removeKeyboardByPathResponse: RemoveKeyboardByPathResponse): Result<NiaRemoveKeyboardByPathResponse, InvalidResponse> {
    if (removeKeyboardByPathResponse.getResultCase() === RemoveKeyboardByPathResponse.ResultCase.SUCCESS_RESULT) {
      const successResult: RemoveKeyboardByPathResponse.SuccessResult | undefined = removeKeyboardByPathResponse.getSuccessResult()

      if (successResult === undefined) {
        return err(new InvalidResponse('Success result was not set.'))
      }

      const niaRemoveKeyboardByPathSuccessResponse: NiaRemoveKeyboardByPathSuccessResult = NiaRemoveKeyboardByPathSuccessResult.from(successResult)
      return ok(new NiaRemoveKeyboardByPathResponse(niaRemoveKeyboardByPathSuccessResponse))
    } else if (removeKeyboardByPathResponse.getResultCase() === RemoveKeyboardByPathResponse.ResultCase.ERROR_RESULT) {
      const errorResult: RemoveKeyboardByPathResponse.ErrorResult | undefined = removeKeyboardByPathResponse.getErrorResult()

      if (errorResult === undefined) {
        return err(new InvalidResponse('Error result was not set.'))
      }

      const niaRemoveKeyboardByPathErrorResponse: NiaRemoveKeyboardByPathErrorResult = NiaRemoveKeyboardByPathErrorResult.from(errorResult)

      return ok(new NiaRemoveKeyboardByPathResponse(niaRemoveKeyboardByPathErrorResponse))
    } else if (removeKeyboardByPathResponse.getResultCase() === RemoveKeyboardByPathResponse.ResultCase.FAILURE_RESULT) {
      const failureResult: RemoveKeyboardByPathResponse.FailureResult | undefined = removeKeyboardByPathResponse.getFailureResult()

      if (failureResult === undefined) {
        return err(new InvalidResponse('Failure result was not set'))
      }

      const niaRemoveKeyboardByPathFailureResult: NiaRemoveKeyboardByPathFailureResult = NiaRemoveKeyboardByPathFailureResult.from(failureResult)

      return ok(new NiaRemoveKeyboardByPathResponse(niaRemoveKeyboardByPathFailureResult))
    }

    return err(new InvalidResponse('Unknown result'))
  }

  static fromResponse(response: Response): Result<NiaRemoveKeyboardByPathResponse, InvalidResponse> {
    if (response.getRequestCase() !== Response.RequestCase.REMOVE_KEYBOARD_BY_PATH_RESPONSE) {
      return err(new InvalidResponse('Invalid response. Expected Execute Code Response.'))
    }

    const removeKeyboardByPathResponse: RemoveKeyboardByPathResponse | undefined = response.getRemoveKeyboardByPathResponse()

    if (removeKeyboardByPathResponse === undefined) {
      return err(new InvalidResponse('Execute Code response was not set'))
    }

    return NiaRemoveKeyboardByPathResponse.from(removeKeyboardByPathResponse)
  }

  static fromUInt8Array(data: Uint8Array): Result<NiaRemoveKeyboardByPathResponse, InvalidResponse> {
    const response: Response = Response.deserializeBinary(data)

    return NiaRemoveKeyboardByPathResponse.fromResponse(response)
  }
}
