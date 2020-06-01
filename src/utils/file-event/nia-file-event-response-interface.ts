import {
  NiaFileEventResponse,
  NiaFileEventResponseType
} from '@/utils'

export interface NiaFileEventResponseInterface {
  toFileEventResponse(): NiaFileEventResponse;
  getEventResponseType(): NiaFileEventResponseType;
}
