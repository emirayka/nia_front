import {ok, err, Result} from 'neverthrow'

import {
  RemoveModifierResponse,
  Response,
} from 'nia-protocol-js'
import {NiaRemoveModifierResult} from '@/utils/protocol'
import InvalidResponse from '@/utils/error/invalid-response'

class NiaRemoveModifierSuccessResult {
  message: string;

  constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }

  static from(successResult: RemoveModifierResponse.SuccessResult): NiaRemoveModifierSuccessResult {
    const message: string = successResult.getMessage()

    return new NiaRemoveModifierSuccessResult(message)
  }
}

class NiaRemoveModifierErrorResult {
  message: string;

  constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }

  static from(errorResult: RemoveModifierResponse.ErrorResult): NiaRemoveModifierErrorResult {
    const message: string = errorResult.getMessage()

    return new NiaRemoveModifierErrorResult(message)
  }
}

class NiaRemoveModifierFailureResult {
  message: string;

  constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }

  static from(failureResult: RemoveModifierResponse.FailureResult): NiaRemoveModifierFailureResult {
    const message: string = failureResult.getMessage()

    return new NiaRemoveModifierFailureResult(message)
  }
}

export default class NiaRemoveModifierResponse {
  response: NiaRemoveModifierSuccessResult | NiaRemoveModifierErrorResult | NiaRemoveModifierFailureResult;

  constructor(response: NiaRemoveModifierSuccessResult | NiaRemoveModifierErrorResult | NiaRemoveModifierFailureResult) {
    this.response = response
  }

  isSuccess(): boolean {
    return this.response instanceof NiaRemoveModifierSuccessResult
  }

  isError(): boolean {
    return this.response instanceof NiaRemoveModifierErrorResult
  }

  isFailure(): boolean {
    return this.response instanceof NiaRemoveModifierFailureResult
  }

  getMessage(): string {
    return this.response.getMessage()
  }

  toResult(): Result<NiaRemoveModifierResult, InvalidResponse> {
    const success: boolean = this.isSuccess()
    const error: boolean = this.isError()
    const failure: boolean = this.isFailure()
    const message: string = this.getMessage()

    const result: NiaRemoveModifierResult = {
      success,
      error,
      failure,
      message,
    }

    return ok(result)
  }

  static from(removeModifierResponse: RemoveModifierResponse): Result<NiaRemoveModifierResponse, InvalidResponse> {
    if (removeModifierResponse.getResultCase() === RemoveModifierResponse.ResultCase.SUCCESS_RESULT) {
      const successResult: RemoveModifierResponse.SuccessResult | undefined = removeModifierResponse.getSuccessResult()

      if (successResult === undefined) {
        return err(new InvalidResponse('Success result was not set.'))
      }

      const niaRemoveModifierSuccessResponse: NiaRemoveModifierSuccessResult = NiaRemoveModifierSuccessResult.from(successResult)
      return ok(new NiaRemoveModifierResponse(niaRemoveModifierSuccessResponse))
    } else if (removeModifierResponse.getResultCase() === RemoveModifierResponse.ResultCase.ERROR_RESULT) {
      const errorResult: RemoveModifierResponse.ErrorResult | undefined = removeModifierResponse.getErrorResult()

      if (errorResult === undefined) {
        return err(new InvalidResponse('Error result was not set.'))
      }

      const niaRemoveModifierErrorResponse: NiaRemoveModifierErrorResult = NiaRemoveModifierErrorResult.from(errorResult)

      return ok(new NiaRemoveModifierResponse(niaRemoveModifierErrorResponse))
    } else if (removeModifierResponse.getResultCase() === RemoveModifierResponse.ResultCase.FAILURE_RESULT) {
      const failureResult: RemoveModifierResponse.FailureResult | undefined = removeModifierResponse.getFailureResult()

      if (failureResult === undefined) {
        return err(new InvalidResponse('Failure result was not set'))
      }

      const niaRemoveModifierFailureResult: NiaRemoveModifierFailureResult = NiaRemoveModifierFailureResult.from(failureResult)

      return ok(new NiaRemoveModifierResponse(niaRemoveModifierFailureResult))
    }

    return err(new InvalidResponse('Unknown result'))
  }

  static fromResponse(response: Response): Result<NiaRemoveModifierResponse, InvalidResponse> {
    if (response.getRequestCase() !== Response.RequestCase.REMOVE_MODIFIER_RESPONSE) {
      return err(new InvalidResponse('Invalid response. Expected Execute Code Response.'))
    }

    const removeModifierResponse: RemoveModifierResponse | undefined = response.getRemoveModifierResponse()

    if (removeModifierResponse === undefined) {
      return err(new InvalidResponse('Execute Code response was not set'))
    }

    return NiaRemoveModifierResponse.from(removeModifierResponse)
  }

  static fromUInt8Array(data: Uint8Array): Result<NiaRemoveModifierResponse, InvalidResponse> {
    const response: Response = Response.deserializeBinary(data)

    return NiaRemoveModifierResponse.fromResponse(response)
  }
}
