import NiaEvent from '@/utils/event/events/event'

export default class NiaDefineKeyboardEvent {
  private readonly keyboardPath: string
  private readonly keyboardName: string

  constructor(keyboardPath: string, keyboardName: string) {
    this.keyboardPath = keyboardPath
    this.keyboardName = keyboardName
  }

  getKeyboardPath(): string {
    return this.keyboardPath
  }

  getKeyboardName(): string {
    return this.keyboardName
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }
}