import SerializableObject from '../../serializableObj'

export interface NiaGetDeviceInfoResultSerialized {
  path: string
  name: string
  model: string
}

export class NiaGetDeviceInfoResult implements SerializableObject<NiaGetDeviceInfoResult, NiaGetDeviceInfoResultSerialized> {
  private readonly path: string
  private readonly name: string
  private readonly model: string

  constructor(path: string, name: string, model: string) {
    this.path = path
    this.name = name
    this.model = model
  }

  getPath(): string {
    return this.path
  }

  getName(): string {
    return this.name
  }

  getModel(): string {
    return this.model
  }

  static deserialize(serialized: NiaGetDeviceInfoResultSerialized): NiaGetDeviceInfoResult {
    return new NiaGetDeviceInfoResult(
      serialized.path,
      serialized.name,
      serialized.model
    )
  }

  serialize(): NiaGetDeviceInfoResultSerialized {
    return {
      path: this.path,
      name: this.name,
      model: this.model
    }
  }
}
