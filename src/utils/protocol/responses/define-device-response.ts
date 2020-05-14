import {DefineDeviceResponse} from 'nia-protocol-js'
import {NiaResponseType} from '@/utils/protocol/response'

export interface NiaDefineDeviceResponseObject {
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaDefineDeviceResponse {
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor({message, success, error, failure}: NiaDefineDeviceResponseObject) {
    this.message = message
    this.success = success
    this.error = error
    this.failure = failure
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
    return NiaResponseType.DefineDevice
  }

  static fromPB(defineDeviceResponse: DefineDeviceResponse): NiaDefineDeviceResponse {
    let message: string | undefined = undefined
    let success: boolean = false
    let error: boolean = false
    let failure: boolean = false

    switch (defineDeviceResponse.getResultCase()) {
      case DefineDeviceResponse.ResultCase.SUCCESS_RESULT:
        message = defineDeviceResponse?.getSuccessResult()?.getMessage()
        success = true
        break;
      case DefineDeviceResponse.ResultCase.ERROR_RESULT:
        message = defineDeviceResponse?.getErrorResult()?.getMessage()
        error = true
        break;
      case DefineDeviceResponse.ResultCase.FAILURE_RESULT:
        message = defineDeviceResponse?.getFailureResult()?.getMessage()
        failure = true
        break;
      case DefineDeviceResponse.ResultCase.RESULT_NOT_SET:
    }

    message = message ?? ''

    return new NiaDefineDeviceResponse({
      message,
      success,
      error,
      failure,
    })
  }
}
