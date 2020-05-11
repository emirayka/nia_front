import {NiaDefineKeyboardRequest, NiaDefineKeyboardResult} from '@/utils/protocol'
import NiaDefineKeyboardEvent from '@/utils/event/events/define-keyboard-event'
import NiaEventResponse from '@/utils/event/response/response'

export default class NiaDefineKeyboardEventResponse {
  private readonly keyboardPath: string
  private readonly keyboardName: string

  private readonly message: string
  private readonly failure: boolean
  private readonly error: boolean
  private readonly success: boolean

  constructor(defineKeyboardEvent: NiaDefineKeyboardEvent, defineKeyboardResult: NiaDefineKeyboardResult) {
    this.keyboardPath = defineKeyboardEvent.getKeyboardPath()
    this.keyboardName = defineKeyboardEvent.getKeyboardName()

    this.message = defineKeyboardResult.getMessage()
    this.failure = defineKeyboardResult.getFailure()
    this.error = defineKeyboardResult.getError()
    this.success = defineKeyboardResult.getSuccess()
  }

  getKeyboardPath(): string {
    return this.keyboardPath
  }

  getKeyboardName(): string {
    return this.keyboardName
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