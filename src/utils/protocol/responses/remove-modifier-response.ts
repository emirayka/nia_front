import {
  RemoveModifierResponse,
  Response,
} from 'nia-protocol-js'
import {NiaResponseType} from '@/utils/protocol/response'

export interface NiaRemoveModifierResponseObject {
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaRemoveModifierResponse {
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaRemoveModifierResponseObject) {
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
    return NiaResponseType.RemoveModifier
  }

  static fromPB(removeDeviceByPathResponsePB: RemoveModifierResponse): NiaRemoveModifierResponse {
    let message: string = ''
    let success: boolean = false
    let error: boolean = false
    let failure: boolean = false

    switch (removeDeviceByPathResponsePB.getResultCase()) {
      case RemoveModifierResponse.ResultCase.SUCCESS_RESULT:
        message = removeDeviceByPathResponsePB.getSuccessResult()?.getMessage() ?? ''
        success = true
        break;
      case RemoveModifierResponse.ResultCase.ERROR_RESULT:
        message = removeDeviceByPathResponsePB.getErrorResult()?.getMessage() ?? ''
        error = true
        break;
      case RemoveModifierResponse.ResultCase.FAILURE_RESULT:
        message = removeDeviceByPathResponsePB.getFailureResult()?.getMessage() ?? ''
        failure = true
        break;
    }

    const args: NiaRemoveModifierResponseObject = {
      message,
      success,
      error,
      failure
    }

    return new NiaRemoveModifierResponse(args)
  }
}
