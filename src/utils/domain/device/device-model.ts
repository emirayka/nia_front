import {NiaKeyDescription} from '@/utils/domain/device/key-description'
import {SerializablePB} from '@/utils'
import {DeviceModel, KeyDescription} from 'nia-protocol-js'

export class NiaDeviceModel implements SerializablePB<NiaDeviceModel, DeviceModel> {
  private readonly deviceWidth: number
  private readonly deviceHeight: number
  private readonly keyDescriptions: Array<NiaKeyDescription>

  constructor(deviceWidth: number, deviceHeight: number, keyDescriptions: Array<NiaKeyDescription>) {
    this.deviceWidth = deviceWidth
    this.deviceHeight = deviceHeight
    this.keyDescriptions = keyDescriptions
  }

  getDeviceWidth(): number {
    return this.deviceWidth
  }

  getDeviceHeight(): number {
    return this.deviceHeight
  }

  getKeyDescriptions(): Array<NiaKeyDescription> {
    return this.keyDescriptions
  }

  toPB(): DeviceModel {
    const keyDescriptionsPB: Array<KeyDescription> = this.keyDescriptions
      .map((keyDescription) => keyDescription.toPB())

    const deviceModelPB: DeviceModel = new DeviceModel()

    deviceModelPB.setDeviceWidth(this.deviceWidth)
    deviceModelPB.setDeviceHeight(this.deviceHeight)
    deviceModelPB.setKeyDescriptionsList(keyDescriptionsPB)

    return deviceModelPB
  }

  static fromPB(deviceModelPB: DeviceModel): NiaDeviceModel {
    const keyDescriptions: Array<NiaKeyDescription> = deviceModelPB.getKeyDescriptionsList()
      .map((keyDescriptionPB) => NiaKeyDescription.fromPB(keyDescriptionPB))

    const deviceWidth: number = deviceModelPB.getDeviceWidth()
    const deviceHeight: number = deviceModelPB.getDeviceHeight()

    return new NiaDeviceModel(deviceWidth, deviceHeight, keyDescriptions)
  }
}