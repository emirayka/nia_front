import {
  RemoveMappingResponse,
  Response,
} from 'nia-protocol-js'
import {NiaResponseType} from '@/utils/protocol/response'

export interface NiaRemoveMappingResponseObject {
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaRemoveMappingResponse {
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaRemoveMappingResponseObject) {
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
    return NiaResponseType.RemoveMapping
  }

  static fromPB(removeMappingResponsePB: RemoveMappingResponse): NiaRemoveMappingResponse {
    let message: string = ''
    let success: boolean = false
    let error: boolean = false
    let failure: boolean = false

    switch (removeMappingResponsePB.getResultCase()) {
      case RemoveMappingResponse.ResultCase.SUCCESS_RESULT:
        message = removeMappingResponsePB.getSuccessResult()?.getMessage() ?? ''
        success = true
        break;

      case RemoveMappingResponse.ResultCase.ERROR_RESULT:
        message = removeMappingResponsePB.getErrorResult()?.getMessage() ?? ''
        error = true
        break;

      case RemoveMappingResponse.ResultCase.FAILURE_RESULT:
        message = removeMappingResponsePB.getFailureResult()?.getMessage() ?? ''
        failure = true
        break;
    }

    const args: NiaRemoveMappingResponseObject = {
      message,
      success,
      error,
      failure
    }

    return new NiaRemoveMappingResponse(args)
  }
}
