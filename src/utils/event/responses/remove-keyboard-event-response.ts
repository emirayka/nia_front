import NiaRemoveKeyboardEvent from '@/utils/event/events/remove-keyboard-event'
import {NiaRemoveKeyboardByPathResult} from '@/utils/protocol'
import NiaEventResponse from '@/utils/event/response/response'

export default class NiaRemoveKeyboardEventResponse {
  private readonly keyboardPath: string

  private readonly message: string
  private readonly failure: boolean
  private readonly error: boolean
  private readonly success: boolean

  constructor(removeKeyboardEvent: NiaRemoveKeyboardEvent, removeKeyboardByPathResult: NiaRemoveKeyboardByPathResult) {
    this.keyboardPath = removeKeyboardEvent.getKeyboardPath()

    this.message = removeKeyboardByPathResult.getMessage()
    this.failure = removeKeyboardByPathResult.getFailure()
    this.error = removeKeyboardByPathResult.getError()
    this.success = removeKeyboardByPathResult.getSuccess()
  }

  getKeyboardPath(): string {
    return this.keyboardPath
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
