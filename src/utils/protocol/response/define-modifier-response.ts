import {ok, err, Result} from 'neverthrow'

import {
  DefineModifierResponse,
  Response,
} from 'nia-protocol-js'
import {NiaDefineModifierResult} from '@/utils/protocol'
import InvalidResponse from '@/utils/error/invalid-response'


class NiaDefineModifierSuccessResult {
  message: string;

  constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }

  static from(successResult: DefineModifierResponse.SuccessResult): NiaDefineModifierSuccessResult {
    const message: string = successResult.getMessage()

    return new NiaDefineModifierSuccessResult(message)
  }
}

class NiaDefineModifierErrorResult {
  message: string;

  constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }

  static from(errorResult: DefineModifierResponse.ErrorResult): NiaDefineModifierErrorResult {
    const message: string = errorResult.getMessage()

    return new NiaDefineModifierErrorResult(message)
  }
}

class NiaDefineModifierFailureResult {
  message: string;

  constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }

  static from(failureResult: DefineModifierResponse.FailureResult): NiaDefineModifierFailureResult {
    const message: string = failureResult.getMessage()

    return new NiaDefineModifierFailureResult(message)
  }
}

export default class NiaDefineModifierResponse {
  response: NiaDefineModifierSuccessResult | NiaDefineModifierErrorResult | NiaDefineModifierFailureResult;

  constructor(response: NiaDefineModifierSuccessResult | NiaDefineModifierErrorResult | NiaDefineModifierFailureResult) {
    this.response = response
  }

  isSuccess(): boolean {
    return this.response instanceof NiaDefineModifierSuccessResult
  }

  isError(): boolean {
    return this.response instanceof NiaDefineModifierErrorResult
  }

  isFailure(): boolean {
    return this.response instanceof NiaDefineModifierFailureResult
  }

  getMessage(): string {
    return this.response.getMessage()
  }

  toResult(): Result<NiaDefineModifierResult, InvalidResponse> {
    const success: boolean = this.isSuccess()
    const error: boolean = this.isError()
    const failure: boolean = this.isFailure()
    const message: string = this.getMessage()

    const result: NiaDefineModifierResult = {
      success,
      error,
      failure,
      message,
    }

    return ok(result)
  }

  static from(defineModifierResponse: DefineModifierResponse): Result<NiaDefineModifierResponse, InvalidResponse> {
    if (defineModifierResponse.getResultCase() === DefineModifierResponse.ResultCase.SUCCESS_RESULT) {
      const successResult: DefineModifierResponse.SuccessResult | undefined = defineModifierResponse.getSuccessResult()

      if (successResult === undefined) {
        return err(new InvalidResponse('Success result was not set.'))
      }

      const niaDefineModifierSuccessResponse: NiaDefineModifierSuccessResult = NiaDefineModifierSuccessResult.from(successResult)
      return ok(new NiaDefineModifierResponse(niaDefineModifierSuccessResponse))
    } else if (defineModifierResponse.getResultCase() === DefineModifierResponse.ResultCase.ERROR_RESULT) {
      const errorResult: DefineModifierResponse.ErrorResult | undefined = defineModifierResponse.getErrorResult()

      if (errorResult === undefined) {
        return err(new InvalidResponse('Error result was not set.'))
      }

      const niaDefineModifierErrorResponse: NiaDefineModifierErrorResult = NiaDefineModifierErrorResult.from(errorResult)

      return ok(new NiaDefineModifierResponse(niaDefineModifierErrorResponse))
    } else if (defineModifierResponse.getResultCase() === DefineModifierResponse.ResultCase.FAILURE_RESULT) {
      const failureResult: DefineModifierResponse.FailureResult | undefined = defineModifierResponse.getFailureResult()

      if (failureResult === undefined) {
        return err(new InvalidResponse('Failure result was not set'))
      }

      const niaDefineModifierFailureResult: NiaDefineModifierFailureResult = NiaDefineModifierFailureResult.from(failureResult)

      return ok(new NiaDefineModifierResponse(niaDefineModifierFailureResult))
    }

    return err(new InvalidResponse('Unknown result'))
  }

  static fromResponse(response: Response): Result<NiaDefineModifierResponse, InvalidResponse> {
    if (response.getRequestCase() !== Response.RequestCase.DEFINE_MODIFIER_RESPONSE) {
      return err(new InvalidResponse('Invalid response. Expected Execute Code Response.'))
    }

    const defineModifierResponse: DefineModifierResponse | undefined = response.getDefineModifierResponse()

    if (defineModifierResponse === undefined) {
      return err(new InvalidResponse('Execute Code response was not set'))
    }

    return NiaDefineModifierResponse.from(defineModifierResponse)
  }

  static fromUInt8Array(data: Uint8Array): Result<NiaDefineModifierResponse, InvalidResponse> {
    const response: Response = Response.deserializeBinary(data)

    return NiaDefineModifierResponse.fromResponse(response)
  }
}
