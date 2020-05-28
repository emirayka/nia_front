import {
  ChangeMappingResponse,
  Response,
} from 'nia-protocol-js'
import InvalidResponse from '@/utils/error/invalid-response'
import {NiaResponseType} from '@/utils/protocol/response'

export interface NiaChangeMappingResponseObject {
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaChangeMappingResponse {
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaChangeMappingResponseObject) {
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
    return NiaResponseType.ChangeMapping
  }

  static fromPB(changeMappingResponsePB: ChangeMappingResponse): NiaChangeMappingResponse {
    let message: string = ''
    let success: boolean = false
    let error: boolean = false
    let failure: boolean = false

    switch (changeMappingResponsePB.getResultCase()) {
      case ChangeMappingResponse.ResultCase.SUCCESS_RESULT:
        message = changeMappingResponsePB.getSuccessResult()?.getMessage() ?? ''
        success = true
        break;

      case ChangeMappingResponse.ResultCase.ERROR_RESULT:
        message = changeMappingResponsePB.getErrorResult()?.getMessage() ?? ''
        error = true
        break;

      case ChangeMappingResponse.ResultCase.FAILURE_RESULT:
        message = changeMappingResponsePB.getFailureResult()?.getMessage() ?? ''
        failure = true
        break;
    }

    const args: NiaChangeMappingResponseObject = {
      message,
      success,
      error,
      failure
    }

    return new NiaChangeMappingResponse(args)
  }
}
