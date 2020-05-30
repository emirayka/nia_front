import {NiaFileEventResponse, NiaFileEventResponseInterface, NiaFileEventResponseType, TreePart} from '@/utils'
import SerializableObject from '@/utils/serializable-object'
import {NiaFile} from '@/store/modules/file'

export interface NiaSaveFileEventResponseObject {
  fullPath: string,
  fileContent: string,
  message: string,
  success: boolean
}

export type NiaSaveFileEventResponseSerialized = NiaSaveFileEventResponseObject

export class NiaSaveFileEventResponse implements NiaFileEventResponseInterface,
  SerializableObject<NiaSaveFileEventResponse, NiaSaveFileEventResponseSerialized> {
  private readonly fullPath: string
  private readonly fileContent: string

  private readonly message: string
  private readonly success: boolean

  constructor(args: NiaSaveFileEventResponseObject) {
    this.fullPath = args.fullPath
    this.fileContent = args.fileContent
    this.message = args.message
    this.success = args.success
  }

  getEventResponseType(): NiaFileEventResponseType {
    return NiaFileEventResponseType.SaveFile
  }

  toFileEventResponse(): NiaFileEventResponse {
    const niaEvent = new NiaFileEventResponse(this)

    return niaEvent
  }

  getFullPath(): string {
    return this.fullPath
  }

  getFileContent(): string {
    return this.fileContent
  }

  getMessage(): string {
    return this.message
  }

  isSuccess(): boolean {
    return this.success
  }

  serialize(): NiaSaveFileEventResponseSerialized {
    return {
      fullPath: this.fullPath,
      fileContent: this.fileContent,
      message: this.message,
      success: this.success
    }
  }

  static deserialize(obj: NiaSaveFileEventResponseSerialized): NiaSaveFileEventResponse {
    const args: NiaSaveFileEventResponseObject = obj

    return new NiaSaveFileEventResponse(args)
  }
}
