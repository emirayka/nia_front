import {
  DefineModifierResponse,
  Response,
} from 'nia-protocol-js'
import InvalidResponse from '@/utils/error/invalid-response'
import {NiaResponseType} from '@/utils/protocol/response'

export interface NiaDefineModifierResponseObject {
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaDefineModifierResponse {
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaDefineModifierResponseObject) {
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
    return NiaResponseType.DefineModifier
  }

  static fromPB(defineModifierResponsePB: DefineModifierResponse): NiaDefineModifierResponse {
    let message: string = ''
    let success: boolean = false
    let error: boolean = false
    let failure: boolean = false

    switch (defineModifierResponsePB.getResultCase()) {
      case DefineModifierResponse.ResultCase.SUCCESS_RESULT:
        message = defineModifierResponsePB.getSuccessResult()?.getMessage() ?? ''
        success = true
        break;
      case DefineModifierResponse.ResultCase.ERROR_RESULT:
        message = defineModifierResponsePB.getErrorResult()?.getMessage() ?? ''
        error = true
        break;
      case DefineModifierResponse.ResultCase.FAILURE_RESULT:
        message = defineModifierResponsePB.getFailureResult()?.getMessage() ?? ''
        failure = true
        break;
    }

    const args: NiaDefineModifierResponseObject = {
      message,
      success,
      error,
      failure
    }

    return new NiaDefineModifierResponse(args)
  }
}
