import {ok, err, Result} from 'neverthrow'

import {
  DefineKeyboardResponse,
  Response,
} from 'nia-protocol-js'
import {NiaDefineKeyboardResult} from '@/utils/protocol'
import InvalidResponse from '@/utils/error/invalid-response'

class NiaDefineKeyboardSuccessResult {
  message: string;

  constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }

  static from(successResult: DefineKeyboardResponse.SuccessResult): NiaDefineKeyboardSuccessResult {
    const message: string = successResult.getMessage()

    return new NiaDefineKeyboardSuccessResult(message)
  }
}

class NiaDefineKeyboardErrorResult {
  message: string;

  constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }

  static from(errorResult: DefineKeyboardResponse.ErrorResult): NiaDefineKeyboardErrorResult {
    const message: string = errorResult.getMessage()

    return new NiaDefineKeyboardErrorResult(message)
  }
}

class NiaDefineKeyboardFailureResult {
  message: string;

  constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }

  static from(failureResult: DefineKeyboardResponse.FailureResult): NiaDefineKeyboardFailureResult {
    const message: string = failureResult.getMessage()

    return new NiaDefineKeyboardFailureResult(message)
  }
}

export default class NiaDefineKeyboardResponse {
  response: NiaDefineKeyboardSuccessResult | NiaDefineKeyboardErrorResult | NiaDefineKeyboardFailureResult;

  constructor(response: NiaDefineKeyboardSuccessResult | NiaDefineKeyboardErrorResult | NiaDefineKeyboardFailureResult) {
    this.response = response
  }

  isSuccess(): boolean {
    return this.response instanceof NiaDefineKeyboardSuccessResult
  }

  isError(): boolean {
    return this.response instanceof NiaDefineKeyboardErrorResult
  }

  isFailure(): boolean {
    return this.response instanceof NiaDefineKeyboardFailureResult
  }

  getMessage(): string {
    return this.response.getMessage()
  }

  toResult(): Result<NiaDefineKeyboardResult, InvalidResponse> {
    const success: boolean = this.isSuccess()
    const error: boolean = this.isError()
    const failure: boolean = this.isFailure()
    const message: string = this.getMessage()

    const result: NiaDefineKeyboardResult = {
      success,
      error,
      failure,
      message,
    }

    return ok(result)
  }

  static from(defineKeyboardResponse: DefineKeyboardResponse): Result<NiaDefineKeyboardResponse, InvalidResponse> {
    if (defineKeyboardResponse.getResultCase() === DefineKeyboardResponse.ResultCase.SUCCESS_RESULT) {
      const successResult: DefineKeyboardResponse.SuccessResult | undefined = defineKeyboardResponse.getSuccessResult()

      if (successResult === undefined) {
        return err(new InvalidResponse('Success result was not set.'))
      }

      const niaDefineKeyboardSuccessResponse: NiaDefineKeyboardSuccessResult = NiaDefineKeyboardSuccessResult.from(successResult)
      return ok(new NiaDefineKeyboardResponse(niaDefineKeyboardSuccessResponse))
    } else if (defineKeyboardResponse.getResultCase() === DefineKeyboardResponse.ResultCase.ERROR_RESULT) {
      const errorResult: DefineKeyboardResponse.ErrorResult | undefined = defineKeyboardResponse.getErrorResult()

      if (errorResult === undefined) {
        return err(new InvalidResponse('Error result was not set.'))
      }

      const niaDefineKeyboardErrorResponse: NiaDefineKeyboardErrorResult = NiaDefineKeyboardErrorResult.from(errorResult)

      return ok(new NiaDefineKeyboardResponse(niaDefineKeyboardErrorResponse))
    } else if (defineKeyboardResponse.getResultCase() === DefineKeyboardResponse.ResultCase.FAILURE_RESULT) {
      const failureResult: DefineKeyboardResponse.FailureResult | undefined = defineKeyboardResponse.getFailureResult()

      if (failureResult === undefined) {
        return err(new InvalidResponse('Failure result was not set'))
      }

      const niaDefineKeyboardFailureResult: NiaDefineKeyboardFailureResult = NiaDefineKeyboardFailureResult.from(failureResult)

      return ok(new NiaDefineKeyboardResponse(niaDefineKeyboardFailureResult))
    }

    return err(new InvalidResponse('Unknown result'))
  }

  static fromResponse(response: Response): Result<NiaDefineKeyboardResponse, InvalidResponse> {
    if (response.getRequestCase() !== Response.RequestCase.DEFINE_KEYBOARD_RESPONSE) {
      return err(new InvalidResponse('Invalid response. Expected Execute Code Response.'))
    }

    const defineKeyboardResponse: DefineKeyboardResponse | undefined = response.getDefineKeyboardResponse()

    if (defineKeyboardResponse === undefined) {
      return err(new InvalidResponse('Execute Code response was not set'))
    }

    return NiaDefineKeyboardResponse.from(defineKeyboardResponse)
  }

  static fromUInt8Array(data: Uint8Array): Result<NiaDefineKeyboardResponse, InvalidResponse> {
    const response: Response = Response.deserializeBinary(data)

    return NiaDefineKeyboardResponse.fromResponse(response)
  }
}
