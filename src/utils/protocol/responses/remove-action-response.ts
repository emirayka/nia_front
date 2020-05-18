import {
  RemoveActionResponse,
  Response,
} from 'nia-protocol-js'
import {NiaResponseType} from '@/utils/protocol/response'

export interface NiaRemoveActionResponseObject {
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaRemoveActionResponse {
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaRemoveActionResponseObject) {
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
    return NiaResponseType.RemoveAction
  }

  static fromPB(removeActionResponsePB: RemoveActionResponse): NiaRemoveActionResponse {
    let message: string = ''
    let success: boolean = false
    let error: boolean = false
    let failure: boolean = false

    switch (removeActionResponsePB.getResultCase()) {
      case RemoveActionResponse.ResultCase.SUCCESS_RESULT:
        message = removeActionResponsePB.getSuccessResult()?.getMessage() ?? ''
        success = true
        break;
      case RemoveActionResponse.ResultCase.ERROR_RESULT:
        message = removeActionResponsePB.getErrorResult()?.getMessage() ?? ''
        error = true
        break;
      case RemoveActionResponse.ResultCase.FAILURE_RESULT:
        message = removeActionResponsePB.getFailureResult()?.getMessage() ?? ''
        failure = true
        break;
    }

    const args: NiaRemoveActionResponseObject = {
      message,
      success,
      error,
      failure
    }

    return new NiaRemoveActionResponse(args)
  }
}
