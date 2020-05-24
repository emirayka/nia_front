import {
  IsListeningResponse,
  Response,
} from 'nia-protocol-js'

import {
  InvalidResponseError,
} from '@/utils'
import {NiaResponseType} from '@/utils/protocol/response'

export interface NiaIsListeningResponseObject {
  listening: boolean

  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaIsListeningResponse {
  private readonly listening: boolean

  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaIsListeningResponseObject) {
    this.listening = args.listening

    this.message = args.message
    this.success = args.success
    this.error = args.error
    this.failure = args.failure
  }

  isListening(): boolean {
    return this.listening
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
    return NiaResponseType.IsListening
  }

  static fromPB(isListeningResponsePB: IsListeningResponse): NiaIsListeningResponse {
    let isListening: boolean = false

    let message: string = ''
    let success: boolean = false
    let error: boolean = false
    let failure: boolean = false

    switch (isListeningResponsePB.getResultCase()) {
      case IsListeningResponse.ResultCase.SUCCESS_RESULT:
        isListening = isListeningResponsePB.getSuccessResult()?.getIsListening() ?? false
        success = true
        break;
      case IsListeningResponse.ResultCase.ERROR_RESULT:
        message = isListeningResponsePB.getErrorResult()?.getMessage() ?? ''
        error = true
        break;
      case IsListeningResponse.ResultCase.FAILURE_RESULT:
        message = isListeningResponsePB.getFailureResult()?.getMessage() ?? ''
        failure = true
        break;
    }

    const args: NiaIsListeningResponseObject = {
      listening: isListening,

      message,
      success,
      error,
      failure
    }

    return new NiaIsListeningResponse(args)
  }
}

