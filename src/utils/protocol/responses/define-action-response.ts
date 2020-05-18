import {
  DefineActionResponse,
  Response,
} from 'nia-protocol-js'
import InvalidResponse from '@/utils/error/invalid-response'
import {NiaResponseType} from '@/utils/protocol/response'

export interface NiaDefineActionResponseObject {
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaDefineActionResponse {
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaDefineActionResponseObject) {
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
    return NiaResponseType.DefineAction
  }

  static fromPB(defineActionResponsePB: DefineActionResponse): NiaDefineActionResponse {
    let message: string = ''
    let success: boolean = true
    let error: boolean = true
    let failure: boolean = true

    switch (defineActionResponsePB.getResultCase()) {
      case DefineActionResponse.ResultCase.SUCCESS_RESULT:
        message = defineActionResponsePB.getSuccessResult()?.getMessage() ?? ''
        success = true
        break;
      case DefineActionResponse.ResultCase.ERROR_RESULT:
        message = defineActionResponsePB.getErrorResult()?.getMessage() ?? ''
        error = true
        break;
      case DefineActionResponse.ResultCase.FAILURE_RESULT:
        message = defineActionResponsePB.getFailureResult()?.getMessage() ?? ''
        failure = true
        break;
    }

    const args: NiaDefineActionResponseObject = {
      message,
      success,
      error,
      failure
    }

    return new NiaDefineActionResponse(args)
  }
}
