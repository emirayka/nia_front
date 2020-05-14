import {NiaDeviceModel, NiaDeviceModelObject, NiaDeviceModelSerialized} from '@/utils/domain/device/device-model'
import {SerializablePB} from '@/utils'
import {DeviceInfo, DeviceModel} from 'nia-protocol-js'
import {Err} from 'neverthrow'
import SerializableObject from '@/utils/serializable-object'

export interface NiaDeviceInfoObject {
  deviceId: number
  defined: boolean
  devicePath: string
  deviceName: string
  deviceModel: NiaDeviceModel
}

export interface NiaDeviceInfoSerialized {
  deviceId: number
  defined: boolean
  devicePath: string
  deviceName: string
  deviceModel: NiaDeviceModelSerialized
}

export class NiaDeviceInfo implements SerializablePB<NiaDeviceInfo, DeviceInfo>, SerializableObject<NiaDeviceInfo, NiaDeviceInfoSerialized> {
  private readonly deviceId: number
  private defined: boolean
  private readonly devicePath: string
  private readonly deviceName: string
  private readonly deviceModel: NiaDeviceModel

  constructor(args: NiaDeviceInfoObject) {
    this.deviceId = args.deviceId
    this.defined = args.defined
    this.devicePath = args.devicePath
    this.deviceName = args.deviceName
    this.deviceModel = args.deviceModel
  }

  getDeviceId(): number {
    return this.deviceId
  }

  isDefined(): boolean {
    return this.defined
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

  setDefined(value: boolean): void {
    this.defined = value
  }

  serialize(): NiaDeviceInfoSerialized {
    const serialized: NiaDeviceInfoSerialized = {
      deviceId: this.deviceId,
      defined: this.defined,
      devicePath: this.devicePath,
      deviceName: this.deviceName,
      deviceModel: this.deviceModel.serialize(),
    }

    return serialized
  }

  static deserialize(serialized: NiaDeviceInfoSerialized): NiaDeviceInfo {
    const args: NiaDeviceInfoObject = {
      deviceId: serialized.deviceId,
      defined: serialized.defined,
      devicePath: serialized.devicePath,
      deviceName: serialized.deviceName,
      deviceModel: NiaDeviceModel.deserialize(serialized.deviceModel),
    }

    return new NiaDeviceInfo(args)
  }

  toPB(): DeviceInfo {
    const deviceInfoPB: DeviceInfo = new DeviceInfo()

    deviceInfoPB.setDeviceId(this.deviceId)
    deviceInfoPB.setDefined(this.defined)
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
    const defined: boolean = deviceInfoPB.getDefined()
    const devicePath: string = deviceInfoPB.getDevicePath()
    const deviceName: string = deviceInfoPB.getDeviceName()
    const deviceModel: NiaDeviceModel = NiaDeviceModel.fromPB(deviceModelPB)

    const args: NiaDeviceInfoObject = {
      deviceId,
      defined,
      devicePath,
      deviceName,
      deviceModel,
    }

    return new NiaDeviceInfo(args)
  }
}