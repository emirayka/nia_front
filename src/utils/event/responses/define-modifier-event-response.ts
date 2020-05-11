import NiaDefineModifierResult from '@/utils/protocol/result/define-modifier-result'
import NiaDefineModifierEvent from '@/utils/event/events/define-modifier-event'
import NiaEventResponse from '@/utils/event/response/response'

export default class NiaDefineModifierEventResponse {
  private readonly keyboardPath: string
  private readonly keyCode: number
  private readonly modifierAlias: string

  private readonly message: string
  private readonly failure: boolean
  private readonly error: boolean
  private readonly success: boolean

  constructor(defineModifierRequest: NiaDefineModifierEvent, defineModifierResult: NiaDefineModifierResult) {
    this.keyboardPath = defineModifierRequest.getKeyboardPath()
    this.keyCode = defineModifierRequest.getKeyCode()
    this.modifierAlias = defineModifierRequest.getModifierAlias()

    this.message = defineModifierResult.getMessage()
    this.failure = defineModifierResult.getFailure()
    this.error = defineModifierResult.getError()
    this.success = defineModifierResult.getSuccess()
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