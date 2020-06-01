import {
  NiaMapping, NiaMappingSerialized,
  NiaEventResponse, NiaKey, NiaKeyObject,
  NiaKeyChord, NiaAction, NiaActionSerialized, NiaKeyChordSerialized,
} from '@/utils'

import SerializableObject from '@/utils/serializable-object'
import {NiaChangeMappingEvent} from '@/utils/event/events/change-mapping-event'
import {NiaChangeMappingResponse} from '@/utils/protocol/responses/change-mapping-response'
import {ExecutionResult} from '@/store/models'

export interface NiaChangeMappingEventResponseObject {
  keyChords: Array<NiaKeyChord>
  action: NiaAction

  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export type NiaChangeMappingEventResponseSerialized = {
  keyChordsSerialized: Array<NiaKeyChordSerialized>
  actionSerialized: NiaActionSerialized

  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaChangeMappingEventResponse implements SerializableObject<NiaChangeMappingEventResponse, NiaChangeMappingEventResponseSerialized> {
  private readonly keyChords: Array<NiaKeyChord>
  private readonly action: NiaAction

  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaChangeMappingEventResponseObject) {
    this.keyChords = args.keyChords
    this.action = args.action
    this.message = args.message
    this.success = args.success
    this.error = args.error
    this.failure = args.failure
  }

  toExecutionResult(): ExecutionResult {
    return {
      code: ``,
      result: this.message,
      success: this.success,
      error: this.error,
      failure: this.failure,
    }
  }

  static from(event: NiaChangeMappingEvent, response: NiaChangeMappingResponse): NiaChangeMappingEventResponse {
    const args: NiaChangeMappingEventResponseObject = {
      keyChords: event.getKeyChords(),
      action: event.getAction(),

      message: response.getMessage(),
      success: response.isSuccess(),
      error: response.isError(),
      failure: response.isFailure(),
    }

    return new NiaChangeMappingEventResponse(args)
  }

  getKeyChords(): Array<NiaKeyChord> {
    return this.keyChords
  }

  getAction(): NiaAction {
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

  static deserialize(serialized: NiaChangeMappingEventResponseSerialized): NiaChangeMappingEventResponse {
    const args: NiaChangeMappingEventResponseObject = {
      keyChords: serialized.keyChordsSerialized
        .map((keyChordSerialized) => NiaKeyChord.deserialize(keyChordSerialized)),
      action: NiaAction.deserialize(serialized.actionSerialized),

      message: serialized.message,
      success: serialized.success,
      error: serialized.error,
      failure: serialized.failure,
    }

    return new NiaChangeMappingEventResponse(args)
  }

  serialize(): NiaChangeMappingEventResponseSerialized {
    return {
      keyChordsSerialized: this.keyChords
        .map((keyChord) => keyChord.serialize()),
      actionSerialized: this.action.serialize(),

      message: this.message,
      success: this.success,
      error: this.error,
      failure: this.failure,
    }
  }
}
