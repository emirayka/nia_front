import NiaExecuteCodeEvent from '@/utils/event/events/execute-code-event'
import NiaExecuteCodeResult from '@/utils/protocol/result/execute-code-result'
import NiaEventResponse from '@/utils/event/response/response'

export default class NiaExecuteCodeEventResponse {
  private readonly code: string

  private readonly message: string
  private readonly failure: boolean
  private readonly error: boolean
  private readonly success: boolean

  constructor(executeCodeEvent: NiaExecuteCodeEvent, executeCodeResult: NiaExecuteCodeResult) {
    this.code = executeCodeEvent.getCode()

    this.message = executeCodeResult.getMessage()
    this.failure = executeCodeResult.getFailure()
    this.error = executeCodeResult.getError()
    this.success = executeCodeResult.getSuccess()
  }

  getCode(): string {
    return this.code
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
