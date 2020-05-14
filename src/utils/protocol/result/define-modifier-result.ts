import SerializableObject from '../../serializableObj'

export interface NiaDefineModifierResultSerialized {
  message: string
  failure: boolean
  error: boolean
  success: boolean
}

export class NiaDefineModifierResult implements SerializableObject<NiaDefineModifierResult, NiaDefineModifierResultSerialized> {
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

  static deserialize(serialized: NiaDefineModifierResultSerialized): NiaDefineModifierResult {
    return new NiaDefineModifierResult(
      serialized.message,
      serialized.failure,
      serialized.error,
      serialized.success,
    )
  }

  serialize(): NiaDefineModifierResultSerialized {
    return {
      message: this.message,
      failure: this.failure,
      error: this.error,
      success: this.success,
    }
  }
}
