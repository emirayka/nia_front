import NiaEvent from '@/utils/event/events/event'

export default class NiaSynchronizeEvent {
  constructor() {}

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }
}