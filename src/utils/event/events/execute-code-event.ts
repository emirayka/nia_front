import NiaEvent from '@/utils/event/events/event'

export default class NiaExecuteCodeEvent {
  private readonly code: string

  constructor(code: string) {
    this.code = code
  }

  getCode(): string {
    return this.code
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }
}