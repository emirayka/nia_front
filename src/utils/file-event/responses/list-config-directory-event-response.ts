import {
  TreePart,
  NiaFileEventResponseInterface, NiaFileEventResponseType, NiaFileEventResponse,
} from '@/utils'
import SerializableObject from '@/utils/serializable-object'

export interface NiaListConfigDirectoryEventResponseObject {
  configTree: TreePart
}

export type NiaListConfigDirectoryEventResponseSerialized = NiaListConfigDirectoryEventResponseObject

export class NiaListConfigDirectoryEventResponse implements NiaFileEventResponseInterface,
  SerializableObject<NiaListConfigDirectoryEventResponse, NiaListConfigDirectoryEventResponseSerialized> {
  private readonly configTree: TreePart

  constructor(args: NiaListConfigDirectoryEventResponseObject) {
    this.configTree = args.configTree
  }

  getEventResponseType(): NiaFileEventResponseType {
    return NiaFileEventResponseType.ListConfigDirectory
  }

  toFileEventResponse(): NiaFileEventResponse {
    const niaEvent = new NiaFileEventResponse(this)

    return niaEvent
  }

  getConfigTree(): TreePart {
    return this.configTree
  }

  serialize(): NiaListConfigDirectoryEventResponseSerialized {
    return {
      configTree: this.configTree
    }
  }

  static deserialize(obj: NiaListConfigDirectoryEventResponseSerialized): NiaListConfigDirectoryEventResponse {
    const args: NiaListConfigDirectoryEventResponseObject = obj

    return new NiaListConfigDirectoryEventResponse(args)
  }
}
