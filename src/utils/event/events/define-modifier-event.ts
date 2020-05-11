import NiaEvent from '@/utils/event/events/event'

export default class NiaDefineModifierEvent {
  private readonly keyboardPath: string
  private readonly keyCode: number
  private readonly modifierAlias: string

  constructor(keyboardPath: string, keyCode: number, modifierAlias: string) {
    this.keyboardPath = keyboardPath
    this.keyCode = keyCode
    this.modifierAlias = modifierAlias
  }

  getKeyboardPath(): string {
    return this.keyboardPath
  }

  getKeyCode(): number {
    return this.keyCode
  }

  getModifierAlias(): string {
    return this.modifierAlias
  }

  toEvent(): NiaEvent {
    const niaEvent = new NiaEvent(this)

    return niaEvent
  }
}
