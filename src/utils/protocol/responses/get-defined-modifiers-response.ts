import {
  ExecuteCodeResponse,
  GetDefinedModifiersResponse, ModifierDescription, Response,
} from 'nia-protocol-js'
import {
  InvalidResponseError, NiaModifierDescription,
} from '@/utils'
import {NiaResponseType} from '@/utils/protocol/response'

export interface NiaGetDefinedModifiersResponseObject {
  modifierDescriptions: Array<NiaModifierDescription>
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaGetDefinedModifiersResponse {
  private readonly modifierDescriptions: Array<NiaModifierDescription>
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaGetDefinedModifiersResponseObject) {
    this.modifierDescriptions = args.modifierDescriptions
    this.message = args.message
    this.success = args.success
    this.error = args.error
    this.failure = args.failure
  }

  getModifierDescriptions(): Array<NiaModifierDescription> {
    return this.modifierDescriptions
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
    return NiaResponseType.GetDefinedModifiers
  }

  static fromPB(getDefinedModifiersResponsePB: GetDefinedModifiersResponse): NiaGetDefinedModifiersResponse {
    let modifierDescriptions: Array<NiaModifierDescription> = []
    let message: string = ''
    let success: boolean = false
    let error: boolean = false
    let failure: boolean = false

    switch (getDefinedModifiersResponsePB.getResultCase()) {
      case GetDefinedModifiersResponse.ResultCase.SUCCESS_RESULT:
        const modifierDescriptionsPB: Array<ModifierDescription> = getDefinedModifiersResponsePB.getSuccessResult()?.getModifierDescriptionsList() ?? []

        for (const modifierDescriptionPB of modifierDescriptionsPB) {
          const modifierDescription: NiaModifierDescription = NiaModifierDescription.fromPB(modifierDescriptionPB)

          modifierDescriptions.push(modifierDescription)
        }

        success = true
        break;
      case GetDefinedModifiersResponse.ResultCase.ERROR_RESULT:
        message = getDefinedModifiersResponsePB.getErrorResult()?.getMessage() ?? ''
        error = true
        break;
      case GetDefinedModifiersResponse.ResultCase.FAILURE_RESULT:
        message = getDefinedModifiersResponsePB.getFailureResult()?.getMessage() ?? ''
        failure = true
        break;
    }

    const args: NiaGetDefinedModifiersResponseObject = {
      modifierDescriptions,
      message,
      success,
      error,
      failure
    }

    return new NiaGetDefinedModifiersResponse(args)
  }
}

