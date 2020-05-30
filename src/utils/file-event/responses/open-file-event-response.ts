import {NiaFileEventResponse, NiaFileEventResponseInterface, NiaFileEventResponseType, TreePart} from '@/utils'
import SerializableObject from '@/utils/serializable-object'
import {NiaFile} from '@/store/modules/file'

export interface NiaOpenFileEventResponseObject {
  fullPath: string,
  fileContent: string,

  message: string,
  success: boolean
}

export type NiaOpenFileEventResponseSerialized = NiaOpenFileEventResponseObject

export class NiaOpenFileEventResponse implements NiaFileEventResponseInterface,
  SerializableObject<NiaOpenFileEventResponse, NiaOpenFileEventResponseSerialized> {
  private readonly fullPath: string
  private readonly fileContent: string

  private readonly message: string
  private readonly success: boolean

  constructor(args: NiaOpenFileEventResponseObject) {
    this.fullPath = args.fullPath
    this.fileContent = args.fileContent
    this.message = args.message
    this.success = args.success
  }

  getEventResponseType(): NiaFileEventResponseType {
    return NiaFileEventResponseType.OpenFile
  }

  toFileEventResponse(): NiaFileEventResponse {
    const niaEvent = new NiaFileEventResponse(this)

    return niaEvent
  }

  toFile(): NiaFile {
    return {
      fullPath: this.fullPath,
      name: this.fullPath.substring(this.fullPath. lastIndexOf('/') + 1),
      fileContent: this.fileContent,
      saved: true,
      markedForDeletion: false
    }
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

  serialize(): NiaOpenFileEventResponseSerialized {
    return {
      fullPath: this.fullPath,
      fileContent: this.fileContent,
      message: this.message,
      success: this.success
    }
  }

  static deserialize(obj: NiaOpenFileEventResponseSerialized): NiaOpenFileEventResponse {
    const args: NiaOpenFileEventResponseObject = obj

    return new NiaOpenFileEventResponse(args)
  }
}
