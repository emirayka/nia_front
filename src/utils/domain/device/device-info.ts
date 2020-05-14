import {NiaDeviceModel} from '@/utils/domain/device/device-model'
import {SerializablePB} from '@/utils'
import {DeviceInfo, DeviceModel} from 'nia-protocol-js'
import {Err} from 'neverthrow'

export class NiaDeviceInfo implements SerializablePB<NiaDeviceInfo, DeviceInfo> {
  private readonly deviceId: number
  private readonly devicePath: string
  private readonly deviceName: string
  private readonly deviceModel: NiaDeviceModel

  constructor(deviceId: number, devicePath: string, deviceName: string, deviceModel: NiaDeviceModel) {
    this.deviceId = deviceId
    this.devicePath = devicePath
    this.deviceName = deviceName
    this.deviceModel = deviceModel
  }

  getDeviceId(): number {
    return this.deviceId
  }

  getDevicePath(): string {
    return this.devicePath
  }

  getDeviceName(): string {
    return this.deviceName
  }

  getDeviceModel(): NiaDeviceModel {
    return this.deviceModel
  }

  toPB(): DeviceInfo {
    const deviceInfoPB: DeviceInfo = new DeviceInfo()

    deviceInfoPB.setDeviceId(this.deviceId)
    deviceInfoPB.setDevicePath(this.devicePath)
    deviceInfoPB.setDeviceName(this.deviceName)
    deviceInfoPB.setDeviceModel(this.deviceModel.toPB())

    return deviceInfoPB
  }

  static fromPB(deviceInfoPB: DeviceInfo): NiaDeviceInfo {
    const deviceModelPB: DeviceModel | undefined = deviceInfoPB.getDeviceModel()

    if (deviceModelPB === undefined) {
      throw new Error('Device model was not set')
    }

    const deviceId: number = deviceInfoPB.getDeviceId()
    const devicePath: string = deviceInfoPB.getDevicePath()
    const deviceName: string = deviceInfoPB.getDeviceName()
    const deviceModel: NiaDeviceModel = NiaDeviceModel.fromPB(deviceModelPB)

    return new NiaDeviceInfo(
      deviceId,
      devicePath,
      deviceName,
      deviceModel
    )
  }
}