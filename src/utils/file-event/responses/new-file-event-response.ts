import {NiaFileEventResponse, NiaFileEventResponseInterface, NiaFileEventResponseType, TreePart} from '@/utils'
import SerializableObject from '@/utils/serializable-object'
import {NiaFile} from '@/store/modules/file'

export interface NiaNewFileEventResponseObject {
  fullPath: string,

  message: string,
  success: boolean
}

export type NiaNewFileEventResponseSerialized = NiaNewFileEventResponseObject

export class NiaNewFileEventResponse implements NiaFileEventResponseInterface,
  SerializableObject<NiaNewFileEventResponse, NiaNewFileEventResponseSerialized> {
  private readonly fullPath: string

  private readonly message: string
  private readonly success: boolean

  constructor(args: NiaNewFileEventResponseObject) {
    this.fullPath = args.fullPath
    this.message = args.message
    this.success = args.success
  }

  getEventResponseType(): NiaFileEventResponseType {
    return NiaFileEventResponseType.NewFile
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

  serialize(): NiaNewFileEventResponseSerialized {
    return {
      fullPath: this.fullPath,
      message: this.message,
      success: this.success
    }
  }

  static deserialize(obj: NiaNewFileEventResponseSerialized): NiaNewFileEventResponse {
    const args: NiaNewFileEventResponseObject = obj

    return new NiaNewFileEventResponse(args)
  }
}
