import {NiaFileEvent, NiaFileEventType} from '@/utils'

export interface NiaFileEventInterface {
  toFileEvent(): NiaFileEvent;
  getEventType(): NiaFileEventType;
}