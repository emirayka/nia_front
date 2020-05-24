import {
  Action,
  ExecuteCodeResponse,
  GetDefinedActionsResponse, NamedAction, Response,
} from 'nia-protocol-js'
import {
  InvalidResponseError, NiaAction,
} from '@/utils'
import {NiaResponseType} from '@/utils/protocol/response'
import {NiaNamedAction} from '@/utils/domain/action/named-action'

export interface NiaGetDefinedActionsResponseObject {
  namedActions: Array<NiaNamedAction>
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaGetDefinedActionsResponse {
  private readonly namedActions: Array<NiaNamedAction>
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaGetDefinedActionsResponseObject) {
    this.namedActions = args.namedActions
    this.message = args.message
    this.success = args.success
    this.error = args.error
    this.failure = args.failure
  }

  getNamedActions(): Array<NiaNamedAction> {
    return this.namedActions
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
    return NiaResponseType.GetDefinedActions
  }

  static fromPB(getDefinedActionsResponsePB: GetDefinedActionsResponse): NiaGetDefinedActionsResponse {
    let namedActions: Array<NiaNamedAction> = []
    let message: string = ''
    let success: boolean = false
    let error: boolean = false
    let failure: boolean = false

    switch (getDefinedActionsResponsePB.getResultCase()) {
      case GetDefinedActionsResponse.ResultCase.SUCCESS_RESULT:
        const namedActionsPB: Array<NamedAction> = getDefinedActionsResponsePB
          .getSuccessResult()
          ?.getNamedActionsList() ?? []

        for (const namedActionPB of namedActionsPB) {
          const namedAction: NiaNamedAction = NiaNamedAction.fromPB(namedActionPB)

          namedActions.push(namedAction)
        }

        success = true
        break;
      case GetDefinedActionsResponse.ResultCase.ERROR_RESULT:
        message = getDefinedActionsResponsePB.getErrorResult()?.getMessage() ?? ''
        error = true
        break;
      case GetDefinedActionsResponse.ResultCase.FAILURE_RESULT:
        message = getDefinedActionsResponsePB.getFailureResult()?.getMessage() ?? ''
        failure = true
        break;
    }

    const args: NiaGetDefinedActionsResponseObject = {
      namedActions,
      message,
      success,
      error,
      failure
    }

    return new NiaGetDefinedActionsResponse(args)
  }
}

