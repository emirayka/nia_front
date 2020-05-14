import SerializableObject from '../../serializableObj'

export interface NiaHandshakeResultSerialized {
  info: string,
  version: string
}

export class NiaHandshakeResult implements SerializableObject<NiaHandshakeResult, NiaHandshakeResultSerialized> {
  private readonly info: string
  private readonly version: string

  constructor(info: string, version: string) {
    this.info = info
    this.version = version
  }

  getInfo(): string {
    return this.info
  }

  getVersion(): string {
    return this.version
  }

  static deserialize(serialized: NiaHandshakeResultSerialized): NiaHandshakeResult {
    return new NiaHandshakeResult(
      serialized.info,
      serialized.version
    )
  }

  serialize(): NiaHandshakeResultSerialized {
    return {
      info: this.info,
      version: this.version
    }
  }
}