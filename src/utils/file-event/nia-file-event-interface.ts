import {NiaFileEvent, NiaFileEventType} from '@/utils/file-event/events/file-event'

export interface NiaFileEventInterface {
  toFileEvent(): NiaFileEvent;
  getEventType(): NiaFileEventType;
}