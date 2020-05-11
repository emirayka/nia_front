import NiaRemoveModifierEvent from '@/utils/event/events/remove-modifier-event'
import NiaRemoveModifierResult from '@/utils/protocol/result/remove-modifier-result'
import NiaEventResponse from '@/utils/event/response/response'

export default class NiaRemoveModifierEventResponse {
  private readonly keyboardPath: string
  private readonly keyCode: number

  private readonly message: string
  private readonly failure: boolean
  private readonly error: boolean
  private readonly success: boolean

  constructor(removeModifierEvent: NiaRemoveModifierEvent, removeModifierResult: NiaRemoveModifierResult) {
    this.keyboardPath = removeModifierEvent.getKeyboardPath()
    this.keyCode = removeModifierEvent.getKeyCode()

    this.message = removeModifierResult.getMessage()
    this.failure = removeModifierResult.getFailure()
    this.error = removeModifierResult.getError()
    this.success = removeModifierResult.getSuccess()
  }

  getKeyboardPath(): string {
    return this.keyboardPath
  }

  getKeyCode(): number {
    return this.keyCode
  }

  getMessage(): string {
    return this.message
  }

  getFailure(): boolean {
    return this.failure
  }

  getError(): boolean {
    return this.error
  }

  getSuccess(): boolean {
    return this.success
  }

  toEventResponse(): NiaEventResponse {
    const niaEventResponse = new NiaEventResponse(this)

    return niaEventResponse
  }
}
