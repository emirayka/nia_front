import serializable from '@/utils/serializable-object'
import {NiaEventResponse} from '@/utils'

export interface NiaDisconnectedEventResponseObject {}

export type NiaDisconnectedEventResponseSerialized = NiaDisconnectedEventResponseObject

export class NiaDisconnectedEventResponse implements serializable<NiaDisconnectedEventResponse, NiaDisconnectedEventResponseObject> {
  constructor(args: NiaDisconnectedEventResponseObject) {
  }

  toEventResponse(): NiaEventResponse {
    const niaEventResponse = new NiaEventResponse(this)

    return niaEventResponse
  }

  static deserialize(obj: NiaDisconnectedEventResponseObject): NiaDisconnectedEventResponse {
    return new NiaDisconnectedEventResponse(obj)
  }

  serialize(): NiaDisconnectedEventResponseSerialized {
    return {}
  }
}
