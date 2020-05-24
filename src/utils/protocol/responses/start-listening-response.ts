import {
  StartListeningResponse,
  Response,
} from 'nia-protocol-js'

import {
  InvalidResponseError,
} from '@/utils'
import {NiaResponseType} from '@/utils/protocol/response'

export interface NiaStartListeningResponseObject {
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaStartListeningResponse {
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaStartListeningResponseObject) {
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
    return NiaResponseType.StartListening
  }

  static fromPB(executeCodeResponsePB: StartListeningResponse): NiaStartListeningResponse {
    let message: string = ''
    let success: boolean = false
    let error: boolean = false
    let failure: boolean = false

    switch (executeCodeResponsePB.getResultCase()) {
      case StartListeningResponse.ResultCase.SUCCESS_RESULT:
        message = executeCodeResponsePB.getSuccessResult()?.getMessage() ?? ''
        success = true
        break;
      case StartListeningResponse.ResultCase.ERROR_RESULT:
        message = executeCodeResponsePB.getErrorResult()?.getMessage() ?? ''
        error = true
        break;
      case StartListeningResponse.ResultCase.FAILURE_RESULT:
        message = executeCodeResponsePB.getFailureResult()?.getMessage() ?? ''
        failure = true
        break;
    }

    const args: NiaStartListeningResponseObject = {
      message,
      success,
      error,
      failure
    }

    return new NiaStartListeningResponse(args)
  }
}

