import serializable from '@/utils/serializable-object'
import {NiaEventResponse} from '@/utils'

export interface NiaConnectedEventResponseObject {}

export type NiaConnectedEventResponseSerialized = NiaConnectedEventResponseObject

export class NiaConnectedEventResponse implements serializable<NiaConnectedEventResponse, NiaConnectedEventResponseObject> {
  constructor(args: NiaConnectedEventResponseObject) {
  }

  toEventResponse(): NiaEventResponse {
    const niaEventResponse = new NiaEventResponse(this)

    return niaEventResponse
  }

  static deserialize(obj: NiaConnectedEventResponseObject): NiaConnectedEventResponse {
    return new NiaConnectedEventResponse(obj)
  }

  serialize(): NiaConnectedEventResponseSerialized {
    return {}
  }
}
