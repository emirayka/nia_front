import {
  RemoveDeviceByNameResponse,
  Response,
} from 'nia-protocol-js'
import {NiaRemoveKeyboardByNameResult} from '@/utils/protocol'
import InvalidResponse from '@/utils/error/invalid-response'
import {NiaResponseType} from '@/utils/protocol/response'

export interface NiaRemoveDeviceByNameResponseObject {
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaRemoveDeviceByNameResponse {
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaRemoveDeviceByNameResponseObject) {
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
    return NiaResponseType.RemoveDeviceByName
  }

  static fromPB(removeDeviceByNameResponsePB: RemoveDeviceByNameResponse): NiaRemoveDeviceByNameResponse {
    let message: string = ''
    let success: boolean = false
    let error: boolean = false
    let failure: boolean = false

    switch (removeDeviceByNameResponsePB.getResultCase()) {
      case RemoveDeviceByNameResponse.ResultCase.SUCCESS_RESULT:
        message = removeDeviceByNameResponsePB.getSuccessResult()?.getMessage() ?? ''
        success = true
        break;
      case RemoveDeviceByNameResponse.ResultCase.ERROR_RESULT:
        message = removeDeviceByNameResponsePB.getErrorResult()?.getMessage() ?? ''
        error = true
        break;
      case RemoveDeviceByNameResponse.ResultCase.FAILURE_RESULT:
        message = removeDeviceByNameResponsePB.getFailureResult()?.getMessage() ?? ''
        failure = true
        break;
    }

    const args: NiaRemoveDeviceByNameResponseObject = {
      message,
      success,
      error,
      failure
    }

    return new NiaRemoveDeviceByNameResponse(args)
  }
}
