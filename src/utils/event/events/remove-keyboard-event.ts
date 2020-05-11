import NiaEvent from '@/utils/event/events/event'

export default class NiaRemoveKeyboardEvent {
  private readonly keyboardPath: string

  constructor(keyboardPath: string) {
    this.keyboardPath = keyboardPath
  }

  getKeyboardPath(): string {
    return this.keyboardPath
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }
}
