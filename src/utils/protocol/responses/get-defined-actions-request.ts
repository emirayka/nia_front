import {
  Action,
  ExecuteCodeResponse,
  GetDefinedActionsResponse, Response,
} from 'nia-protocol-js'
import {
  InvalidResponseError, NiaAction,
} from '@/utils'
import {NiaResponseType} from '@/utils/protocol/response'

export interface NiaGetDefinedActionsResponseObject {
  actions: Array<NiaAction>
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaGetDefinedActionsResponse {
  private readonly actions: Array<NiaAction>
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaGetDefinedActionsResponseObject) {
    this.actions = args.actions
    this.message = args.message
    this.success = args.success
    this.error = args.error
    this.failure = args.failure
  }

  getActions(): Array<NiaAction> {
    return this.actions
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
    let actions: Array<NiaAction> = []
    let message: string = ''
    let success: boolean = false
    let error: boolean = false
    let failure: boolean = false

    switch (getDefinedActionsResponsePB.getResultCase()) {
      case GetDefinedActionsResponse.ResultCase.SUCCESS_RESULT:
        const actionsPB: Array<Action> = getDefinedActionsResponsePB.getSuccessResult()?.getActionsList() ?? []

        for (const actionPB of actionsPB) {
          const action: NiaAction = NiaAction.fromPB(actionPB)

          actions.push(action)
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
      actions,
      message,
      success,
      error,
      failure
    }

    return new NiaGetDefinedActionsResponse(args)
  }
}

