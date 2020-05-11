export default class NiaRemoveModifierResult {
  private readonly message: string
  private readonly failure: boolean
  private readonly error: boolean
  private readonly success: boolean

  constructor(message: string, failure: boolean, error: boolean, success: boolean) {
    this.message = message
    this.failure = failure
    this.error = error
    this.success = success
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
}
