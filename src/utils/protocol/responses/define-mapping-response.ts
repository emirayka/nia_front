import {
  DefineMappingResponse,
  Response,
} from 'nia-protocol-js'
import InvalidResponse from '@/utils/error/invalid-response'
import {NiaResponseType} from '@/utils/protocol/response'

export interface NiaDefineMappingResponseObject {
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaDefineMappingResponse {
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaDefineMappingResponseObject) {
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
    return NiaResponseType.DefineMapping
  }

  static fromPB(defineMappingResponsePB: DefineMappingResponse): NiaDefineMappingResponse {
    let message: string = ''
    let success: boolean = false
    let error: boolean = false
    let failure: boolean = false

    switch (defineMappingResponsePB.getResultCase()) {
      case DefineMappingResponse.ResultCase.SUCCESS_RESULT:
        message = defineMappingResponsePB.getSuccessResult()?.getMessage() ?? ''
        success = true
        break;

      case DefineMappingResponse.ResultCase.ERROR_RESULT:
        message = defineMappingResponsePB.getErrorResult()?.getMessage() ?? ''
        console.log(message)
        error = true
        break;

      case DefineMappingResponse.ResultCase.FAILURE_RESULT:
        message = defineMappingResponsePB.getFailureResult()?.getMessage() ?? ''
        failure = true
        break;
    }

    const args: NiaDefineMappingResponseObject = {
      message,
      success,
      error,
      failure
    }

    return new NiaDefineMappingResponse(args)
  }
}
