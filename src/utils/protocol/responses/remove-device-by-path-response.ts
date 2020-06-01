import {
  RemoveDeviceByPathResponse,
  Response,
} from 'nia-protocol-js'
import InvalidResponse from '@/utils/error/invalid-response'
import {NiaResponseType} from '@/utils/protocol/response'

export interface NiaRemoveDeviceByPathResponseObject {
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaRemoveDeviceByPathResponse {
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaRemoveDeviceByPathResponseObject) {
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
    return NiaResponseType.RemoveDeviceByPath
  }

  static fromPB(removeDeviceByPathResponsePB: RemoveDeviceByPathResponse): NiaRemoveDeviceByPathResponse {
    let message: string = ''
    let success: boolean = false
    let error: boolean = false
    let failure: boolean = false

    switch (removeDeviceByPathResponsePB.getResultCase()) {
      case RemoveDeviceByPathResponse.ResultCase.SUCCESS_RESULT:
        message = removeDeviceByPathResponsePB.getSuccessResult()?.getMessage() ?? ''
        success = true
        break;
      case RemoveDeviceByPathResponse.ResultCase.ERROR_RESULT:
        message = removeDeviceByPathResponsePB.getErrorResult()?.getMessage() ?? ''
        error = true
        break;
      case RemoveDeviceByPathResponse.ResultCase.FAILURE_RESULT:
        message = removeDeviceByPathResponsePB.getFailureResult()?.getMessage() ?? ''
        failure = true
        break;
    }

    const args: NiaRemoveDeviceByPathResponseObject = {
      message,
      success,
      error,
      failure
    }

    return new NiaRemoveDeviceByPathResponse(args)
  }
}
