import {NiaFileEventResponse, NiaFileEventResponseType} from '@/utils/file-event/responses/file-event-response'

export interface NiaFileEventResponseInterface {
  toFileEventResponse(): NiaFileEventResponse;
  getEventResponseType(): NiaFileEventResponseType;
}
