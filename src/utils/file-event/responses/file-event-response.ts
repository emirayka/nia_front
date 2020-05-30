import {
  NiaFileEventResponseType,
  NiaListConfigDirectoryEventResponse,
  NiaListConfigDirectoryEventResponseSerialized,
  NiaOpenFileEventResponse,
  NiaOpenFileEventResponseSerialized,
} from '@/utils'
import SerializableObject from '@/utils/serializable-object'
import {
  NiaSaveFileEventResponse,
  NiaSaveFileEventResponseSerialized,
} from '@/utils/file-event/responses/save-file-event-response'
import {NiaNewFileEvent} from '@/utils/file-event/events/new-file-event'
import {
  NiaNewFileEventResponse,
  NiaNewFileEventResponseSerialized,
} from '@/utils/file-event/responses/new-file-event-response'
import {
  NiaNewDirectoryEventResponse,
  NiaNewDirectoryEventResponseSerialized,
} from '@/utils/file-event/responses/new-directory-event-response'
import {
  NiaDeleteEventResponse,
  NiaDeleteEventResponseSerialized,
} from '@/utils/file-event/responses/delete-event-response'

export type NiaFileEventResponseUnderlyingTypeSerialized =
  NiaListConfigDirectoryEventResponseSerialized |
  NiaOpenFileEventResponseSerialized |
  NiaSaveFileEventResponseSerialized |
  NiaNewFileEventResponseSerialized |
  NiaNewDirectoryEventResponseSerialized |
  NiaDeleteEventResponseSerialized

export type NiaFileEventResponseUnderlyingType =
  NiaListConfigDirectoryEventResponse |
  NiaOpenFileEventResponse |
  NiaSaveFileEventResponse |
  NiaNewFileEventResponse |
  NiaNewDirectoryEventResponse |
  NiaDeleteEventResponse

export interface NiaFileEventResponseSerialized {
  eventResponseType: NiaFileEventResponseType,
  eventResponse: NiaFileEventResponseUnderlyingTypeSerialized
}

export class NiaFileEventResponse implements SerializableObject<NiaFileEventResponse, NiaFileEventResponseSerialized> {
  private readonly eventResponse: NiaFileEventResponseUnderlyingType

  constructor(eventResponse: NiaFileEventResponseUnderlyingType) {
    this.eventResponse = eventResponse
  }

  getEventResponseType(): NiaFileEventResponseType {
    return this.eventResponse.getEventResponseType()
  }

  getEventResponse(): NiaFileEventResponseUnderlyingType {
    return this.eventResponse
  }

  static deserialize(serialized: NiaFileEventResponseSerialized): NiaFileEventResponse {
    switch (serialized.eventResponseType) {
      case NiaFileEventResponseType.ListConfigDirectory:
        return new NiaFileEventResponse(
          NiaListConfigDirectoryEventResponse.deserialize(
            serialized.eventResponse as NiaListConfigDirectoryEventResponseSerialized,
          ),
        )

      case NiaFileEventResponseType.OpenFile:
        return new NiaFileEventResponse(
          NiaOpenFileEventResponse.deserialize(
            serialized.eventResponse as NiaOpenFileEventResponseSerialized,
          ),
        )

      case NiaFileEventResponseType.SaveFile:
        return new NiaFileEventResponse(
          NiaSaveFileEventResponse.deserialize(
            serialized.eventResponse as NiaSaveFileEventResponseSerialized,
          ),
        )

      case NiaFileEventResponseType.NewFile:
        return new NiaFileEventResponse(
          NiaNewFileEventResponse.deserialize(
            serialized.eventResponse as NiaNewFileEventResponseSerialized,
          ),
        )

      case NiaFileEventResponseType.NewDirectory:
        return new NiaFileEventResponse(
          NiaNewDirectoryEventResponse.deserialize(
            serialized.eventResponse as NiaNewDirectoryEventResponseSerialized,
          ),
        )

      case NiaFileEventResponseType.Delete:
        return new NiaFileEventResponse(
          NiaDeleteEventResponse.deserialize(
            serialized.eventResponse as NiaDeleteEventResponseSerialized,
          ),
        )
    }
  }

  serialize(): NiaFileEventResponseSerialized {
    return {
      eventResponseType: this.eventResponse.getEventResponseType(),
      eventResponse: this.eventResponse.serialize(),
    }
  }
}
