import {NiaKeyDescription, NiaKeyDescriptionSerialized} from '@/utils/domain/device/key-description'
import {NiaSynchronizeEventResponse, SerializablePB} from '@/utils'
import {DeviceModel, KeyDescription} from 'nia-protocol-js'
import SerializableObject from '@/utils/serializable-object'

export interface NiaDeviceModelObject {
  deviceWidth: number,
  deviceHeight: number,
  keyDescriptions: Array<NiaKeyDescription>
}

export interface NiaDeviceModelSerialized {
  deviceWidth: number,
  deviceHeight: number,
  keyDescriptions: Array<NiaKeyDescriptionSerialized>
}

export class NiaDeviceModel implements SerializablePB<NiaDeviceModel, DeviceModel>, SerializableObject<NiaDeviceModel, NiaDeviceModelSerialized> {
  private readonly deviceWidth: number
  private readonly deviceHeight: number
  private readonly keyDescriptions: Array<NiaKeyDescription>

  constructor(args: NiaDeviceModelObject) {
    this.deviceWidth = args.deviceWidth
    this.deviceHeight = args.deviceHeight
    this.keyDescriptions = args.keyDescriptions
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

  serialize(): NiaDeviceModelSerialized {
    return {
      deviceWidth: this.deviceWidth,
      deviceHeight: this.deviceHeight,
      keyDescriptions: this.keyDescriptions.map((keyDescription) => keyDescription.serialize()),
    }
  }

  static deserialize(serialized: NiaDeviceModelSerialized): NiaDeviceModel {
    const args: NiaDeviceModelObject = {
      deviceWidth: serialized.deviceWidth,
      deviceHeight: serialized.deviceHeight,
      keyDescriptions: serialized
        .keyDescriptions
        .map((keyDescriptionSerialized) => NiaKeyDescription.deserialize(keyDescriptionSerialized)),
    }

    return new NiaDeviceModel(args)
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

    const args: NiaDeviceModelObject = {
      deviceWidth,
      deviceHeight,
      keyDescriptions
    }

    return new NiaDeviceModel(args)
  }
}