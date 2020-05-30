import {NiaFileEventResponse, NiaFileEventResponseInterface, NiaFileEventResponseType, TreePart} from '@/utils'
import SerializableObject from '@/utils/serializable-object'
import {NiaFile} from '@/store/modules/file'

export interface NiaNewDirectoryEventResponseObject {
  fullPath: string,

  message: string,
  success: boolean
}

export type NiaNewDirectoryEventResponseSerialized = NiaNewDirectoryEventResponseObject

export class NiaNewDirectoryEventResponse implements NiaFileEventResponseInterface,
  SerializableObject<NiaNewDirectoryEventResponse, NiaNewDirectoryEventResponseSerialized> {
  private readonly fullPath: string

  private readonly message: string
  private readonly success: boolean

  constructor(args: NiaNewDirectoryEventResponseObject) {
    this.fullPath = args.fullPath
    this.message = args.message
    this.success = args.success
  }

  getEventResponseType(): NiaFileEventResponseType {
    return NiaFileEventResponseType.NewDirectory
  }

  toFileEventResponse(): NiaFileEventResponse {
    const niaEvent = new NiaFileEventResponse(this)

    return niaEvent
  }

  getFullPath(): string {
    return this.fullPath
  }

  getMessage(): string {
    return this.message
  }

  isSuccess(): boolean {
    return this.success
  }

  serialize(): NiaNewDirectoryEventResponseSerialized {
    return {
      fullPath: this.fullPath,
      message: this.message,
      success: this.success
    }
  }

  static deserialize(obj: NiaNewDirectoryEventResponseSerialized): NiaNewDirectoryEventResponse {
    const args: NiaNewDirectoryEventResponseObject = obj

    return new NiaNewDirectoryEventResponse(args)
  }
}
