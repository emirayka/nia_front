import SerializableObject from '../../serializableObj'

export interface NiaGetDevicesResultSerialized {
  devices: Array<string>
}

export class NiaGetDevicesResult implements SerializableObject<NiaGetDevicesResult, NiaGetDevicesResultSerialized> {
  private readonly devices: Array<string>

  constructor(devices: Array<string>) {
    this.devices = devices
  }

  getDevices(): Array<string> {
    return this.devices
  }

  static deserialize(serialized: NiaGetDevicesResultSerialized): NiaGetDevicesResult {
    return new NiaGetDevicesResult(
      serialized.devices
    )
  }

  serialize(): NiaGetDevicesResultSerialized {
    return {
      devices: this.devices
    }
  }
}
