import {
  NiaAction,
  NiaRemoveDeviceEvent,
  NiaEventResponse, NiaKey, NiaKeyObject, NiaActionSerialized,
  NiaRemoveActionEvent,
  NiaRemoveActionResponse,
} from '@/utils'

import SerializableObject from '@/utils/serializable-object'

export interface NiaRemoveActionEventResponseObject {
  actionName: string
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export type NiaRemoveActionEventResponseSerialized = {
  actionName: string
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaRemoveActionEventResponse implements SerializableObject<NiaRemoveActionEventResponse, NiaRemoveActionEventResponseSerialized> {
  private readonly actionName: string
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaRemoveActionEventResponseObject) {
    this.actionName = args.actionName
    this.message = args.message
    this.success = args.success
    this.error = args.error
    this.failure = args.failure
  }

  static from(
    event: NiaRemoveActionEvent,
    response: NiaRemoveActionResponse,
  ): NiaRemoveActionEventResponse {
    const args: NiaRemoveActionEventResponseObject = {
      actionName: event.getActionName(),

      message: response.getMessage(),
      success: response.isSuccess(),
      error: response.isError(),
      failure: response.isFailure(),
    }

    return new NiaRemoveActionEventResponse(args)
  }

  getActionName(): string {
    return this.actionName
  }

  getMessage(): string {
    return this.message
  }

  getFailure(): boolean {
    return this.failure
  }

  getError(): boolean {
    return this.error
  }

  getSuccess(): boolean {
    return this.success
  }

  toEventResponse(): NiaEventResponse {
    const niaEventResponse = new NiaEventResponse(this)

    return niaEventResponse
  }

  static deserialize(serialized: NiaRemoveActionEventResponseSerialized): NiaRemoveActionEventResponse {
    const args: NiaRemoveActionEventResponseObject = serialized

    return new NiaRemoveActionEventResponse(args)
  }

  serialize(): NiaRemoveActionEventResponseObject {
    return {
      actionName: this.actionName,
      message: this.message,
      success: this.success,
      error: this.error,
      failure: this.failure,
    }
  }
}
