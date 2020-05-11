import {ok, err, Result} from 'neverthrow'

import {
  RemoveKeyboardByNameResponse,
  Response,
} from 'nia-protocol-js'
import {NiaRemoveKeyboardByNameResult} from '@/utils/protocol'
import InvalidResponse from '@/utils/error/invalid-response'

class NiaRemoveKeyboardByNameSuccessResult {
  message: string;

  constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }

  static from(successResult: RemoveKeyboardByNameResponse.SuccessResult): NiaRemoveKeyboardByNameSuccessResult {
    const message: string = successResult.getMessage()

    return new NiaRemoveKeyboardByNameSuccessResult(message)
  }
}

class NiaRemoveKeyboardByNameErrorResult {
  message: string;

  constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }

  static from(errorResult: RemoveKeyboardByNameResponse.ErrorResult): NiaRemoveKeyboardByNameErrorResult {
    const message: string = errorResult.getMessage()

    return new NiaRemoveKeyboardByNameErrorResult(message)
  }
}

class NiaRemoveKeyboardByNameFailureResult {
  message: string;

  constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }

  static from(failureResult: RemoveKeyboardByNameResponse.FailureResult): NiaRemoveKeyboardByNameFailureResult {
    const message: string = failureResult.getMessage()

    return new NiaRemoveKeyboardByNameFailureResult(message)
  }
}

export default class NiaRemoveKeyboardByNameResponse {
  response: NiaRemoveKeyboardByNameSuccessResult | NiaRemoveKeyboardByNameErrorResult | NiaRemoveKeyboardByNameFailureResult;

  constructor(response: NiaRemoveKeyboardByNameSuccessResult | NiaRemoveKeyboardByNameErrorResult | NiaRemoveKeyboardByNameFailureResult) {
    this.response = response
  }

  isSuccess(): boolean {
    return this.response instanceof NiaRemoveKeyboardByNameSuccessResult
  }

  isError(): boolean {
    return this.response instanceof NiaRemoveKeyboardByNameErrorResult
  }

  isFailure(): boolean {
    return this.response instanceof NiaRemoveKeyboardByNameFailureResult
  }

  getMessage(): string {
    return this.response.getMessage()
  }

  toResult(): Result<NiaRemoveKeyboardByNameResult, InvalidResponse> {
    const success: boolean = this.isSuccess()
    const error: boolean = this.isError()
    const failure: boolean = this.isFailure()
    const message: string = this.getMessage()

    const result: NiaRemoveKeyboardByNameResult = {
      success,
      error,
      failure,
      message,
    }

    return ok(result)
  }

  static from(removeKeyboardByNameResponse: RemoveKeyboardByNameResponse): Result<NiaRemoveKeyboardByNameResponse, InvalidResponse> {
    if (removeKeyboardByNameResponse.getResultCase() === RemoveKeyboardByNameResponse.ResultCase.SUCCESS_RESULT) {
      const successResult: RemoveKeyboardByNameResponse.SuccessResult | undefined = removeKeyboardByNameResponse.getSuccessResult()

      if (successResult === undefined) {
        return err(new InvalidResponse('Success result was not set.'))
      }

      const niaRemoveKeyboardByNameSuccessResponse: NiaRemoveKeyboardByNameSuccessResult = NiaRemoveKeyboardByNameSuccessResult.from(successResult)
      return ok(new NiaRemoveKeyboardByNameResponse(niaRemoveKeyboardByNameSuccessResponse))
    } else if (removeKeyboardByNameResponse.getResultCase() === RemoveKeyboardByNameResponse.ResultCase.ERROR_RESULT) {
      const errorResult: RemoveKeyboardByNameResponse.ErrorResult | undefined = removeKeyboardByNameResponse.getErrorResult()

      if (errorResult === undefined) {
        return err(new InvalidResponse('Error result was not set.'))
      }

      const niaRemoveKeyboardByNameErrorResponse: NiaRemoveKeyboardByNameErrorResult = NiaRemoveKeyboardByNameErrorResult.from(errorResult)

      return ok(new NiaRemoveKeyboardByNameResponse(niaRemoveKeyboardByNameErrorResponse))
    } else if (removeKeyboardByNameResponse.getResultCase() === RemoveKeyboardByNameResponse.ResultCase.FAILURE_RESULT) {
      const failureResult: RemoveKeyboardByNameResponse.FailureResult | undefined = removeKeyboardByNameResponse.getFailureResult()

      if (failureResult === undefined) {
        return err(new InvalidResponse('Failure result was not set'))
      }

      const niaRemoveKeyboardByNameFailureResult: NiaRemoveKeyboardByNameFailureResult = NiaRemoveKeyboardByNameFailureResult.from(failureResult)

      return ok(new NiaRemoveKeyboardByNameResponse(niaRemoveKeyboardByNameFailureResult))
    }

    return err(new InvalidResponse('Unknown result'))
  }

  static fromResponse(response: Response): Result<NiaRemoveKeyboardByNameResponse, InvalidResponse> {
    if (response.getRequestCase() !== Response.RequestCase.REMOVE_KEYBOARD_BY_NAME_RESPONSE) {
      return err(new InvalidResponse('Invalid response. Expected Execute Code Response.'))
    }

    const removeKeyboardByNameResponse: RemoveKeyboardByNameResponse | undefined = response.getRemoveKeyboardByNameResponse()

    if (removeKeyboardByNameResponse === undefined) {
      return err(new InvalidResponse('Execute Code response was not set'))
    }

    return NiaRemoveKeyboardByNameResponse.from(removeKeyboardByNameResponse)
  }

  static fromUInt8Array(data: Uint8Array): Result<NiaRemoveKeyboardByNameResponse, InvalidResponse> {
    const response: Response = Response.deserializeBinary(data)

    return NiaRemoveKeyboardByNameResponse.fromResponse(response)
  }
}
