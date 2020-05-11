import NiaEvent from '@/utils/event/events/event'

export default class NiaRemoveModifierEvent {
  private readonly keyboardPath: string
  private readonly keyCode: number

  constructor(keyboardPath: string, keyCode: number) {
    this.keyboardPath = keyboardPath
    this.keyCode = keyCode
  }

  getKeyboardPath(): string {
    return this.keyboardPath
  }

  getKeyCode(): number {
    return this.keyCode
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }
}