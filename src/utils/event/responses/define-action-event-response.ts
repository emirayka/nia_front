import {
  NiaAction, NiaActionSerialized, NiaDefineActionEvent,
  NiaDefineDeviceEvent,
  NiaEventResponse, NiaKey, NiaKeyObject, NiaNamedAction, NiaNamedActionSerialized,
} from '@/utils'

import SerializableObject from '@/utils/serializable-object'
import {NiaDefineActionResponse} from '@/utils/protocol/responses/define-action-response'

export interface NiaDefineActionEventResponseObject {
  action: NiaNamedAction

  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export type NiaDefineActionEventResponseSerialized = {
  actionSerialized: NiaNamedActionSerialized

  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaDefineActionEventResponse implements SerializableObject<NiaDefineActionEventResponse, NiaDefineActionEventResponseSerialized> {
  private readonly action: NiaNamedAction
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaDefineActionEventResponseObject) {
    this.action = args.action
    this.message = args.message
    this.success = args.success
    this.error = args.error
    this.failure = args.failure
  }

  static from(event: NiaDefineActionEvent, response: NiaDefineActionResponse): NiaDefineActionEventResponse {
    const args: NiaDefineActionEventResponseObject = {
      action: event.getNamedAction(),

      message: response.getMessage(),
      success: response.isSuccess(),
      error: response.isError(),
      failure: response.isFailure(),
    }

    return new NiaDefineActionEventResponse(args)
  }

  getAction(): NiaNamedAction {
    return this.action
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
    return this.error
  }

  toEventResponse(): NiaEventResponse {
    const niaEventResponse = new NiaEventResponse(this)

    return niaEventResponse
  }

  static deserialize(serialized: NiaDefineActionEventResponseSerialized): NiaDefineActionEventResponse {
    const args: NiaDefineActionEventResponseObject = {
      action: NiaNamedAction.deserialize(serialized.actionSerialized),

      message: serialized.message,
      success: serialized.success,
      error: serialized.error,
      failure: serialized.failure,
    }

    return new NiaDefineActionEventResponse(args)
  }

  serialize(): NiaDefineActionEventResponseSerialized {
    return {
      actionSerialized: this.action.serialize(),

      message: this.message,
      success: this.success,
      error: this.error,
      failure: this.failure,
    }
  }
}
