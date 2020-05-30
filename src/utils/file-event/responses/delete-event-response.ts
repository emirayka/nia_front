import {NiaFileEventResponse, NiaFileEventResponseInterface, NiaFileEventResponseType, TreePart} from '@/utils'
import SerializableObject from '@/utils/serializable-object'
import {NiaFile} from '@/store/modules/file'

export interface NiaDeleteEventResponseObject {
  paths: Array<string>

  message: string,
  success: boolean
}

export type NiaDeleteEventResponseSerialized = NiaDeleteEventResponseObject

export class NiaDeleteEventResponse implements NiaFileEventResponseInterface,
  SerializableObject<NiaDeleteEventResponse, NiaDeleteEventResponseSerialized> {
  private readonly paths: Array<string>

  private readonly message: string
  private readonly success: boolean

  constructor(args: NiaDeleteEventResponseObject) {
    this.paths = args.paths
    this.message = args.message
    this.success = args.success
  }

  getEventResponseType(): NiaFileEventResponseType {
    return NiaFileEventResponseType.Delete
  }

  toFileEventResponse(): NiaFileEventResponse {
    const niaEvent = new NiaFileEventResponse(this)

    return niaEvent
  }

  getPaths(): Array<string> {
    return this.paths
  }

  getMessage(): string {
    return this.message
  }

  isSuccess(): boolean {
    return this.success
  }

  serialize(): NiaDeleteEventResponseSerialized {
    return {
      paths: this.paths,
      message: this.message,
      success: this.success
    }
  }

  static deserialize(obj: NiaDeleteEventResponseSerialized): NiaDeleteEventResponse {
    const args: NiaDeleteEventResponseObject = obj

    return new NiaDeleteEventResponse(args)
  }
}
