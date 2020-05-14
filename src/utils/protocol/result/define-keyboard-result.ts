import SerializableObject from '../../serializableObj'

export interface NiaDefineKeyboardResultSerialized {
  message: string
  failure: boolean
  error: boolean
  success: boolean
}

export class NiaDefineKeyboardResult implements SerializableObject<NiaDefineKeyboardResult, NiaDefineKeyboardResultSerialized> {
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

  static deserialize(serialized: NiaDefineKeyboardResultSerialized): NiaDefineKeyboardResult {
    return new NiaDefineKeyboardResult(
      serialized.message,
      serialized.failure,
      serialized.error,
      serialized.success,
    )
  }

  serialize(): NiaDefineKeyboardResultSerialized {
    return {
      message: this.message,
      failure: this.failure,
      error: this.error,
      success: this.success,
    }
  }
}
