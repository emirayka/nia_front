import {
  RemoveDeviceByIdResponse,
  Response,
} from 'nia-protocol-js'
import InvalidResponse from '@/utils/error/invalid-response'
import {NiaResponseType} from '@/utils/protocol/response'

export interface NiaRemoveDeviceByIdResponseObject {
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaRemoveDeviceByIdResponse {
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaRemoveDeviceByIdResponseObject) {
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
    return NiaResponseType.RemoveDeviceById
  }

  static fromPB(removeDeviceByIdResponsePB: RemoveDeviceByIdResponse): NiaRemoveDeviceByIdResponse {
    let message: string = ''
    let success: boolean = false
    let error: boolean = false
    let failure: boolean = false

    switch (removeDeviceByIdResponsePB.getResultCase()) {
      case RemoveDeviceByIdResponse.ResultCase.SUCCESS_RESULT:
        message = removeDeviceByIdResponsePB.getSuccessResult()?.getMessage() ?? ''
        success = true
        break;
      case RemoveDeviceByIdResponse.ResultCase.ERROR_RESULT:
        message = removeDeviceByIdResponsePB.getErrorResult()?.getMessage() ?? ''
        error = true
        break;
      case RemoveDeviceByIdResponse.ResultCase.FAILURE_RESULT:
        message = removeDeviceByIdResponsePB.getFailureResult()?.getMessage() ?? ''
        failure = true
        break;
    }

    const args: NiaRemoveDeviceByIdResponseObject = {
      message,
      success,
      error,
      failure
    }

    return new NiaRemoveDeviceByIdResponse(args)
  }
}
