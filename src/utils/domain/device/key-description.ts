import {KeyDescription} from 'nia-protocol-js'
import {NiaSynchronizeEventResponseObject, SerializablePB} from '@/utils'
import SerializableObject from '@/utils/serializable-object'

export interface NiaKeyDescriptionObject {
  x: number
  y: number
  width: number
  height: number
  keyCode: number
}

export type NiaKeyDescriptionSerialized = NiaKeyDescriptionObject

export class NiaKeyDescription implements SerializablePB<NiaKeyDescription, KeyDescription>, SerializableObject<NiaKeyDescription, NiaKeyDescriptionSerialized> {
  private readonly x: number
  private readonly y: number
  private readonly width: number
  private readonly height: number
  private readonly keyCode: number

  constructor(args: NiaKeyDescriptionObject) {
    this.x = args.x
    this.y = args.y
    this.width = args.width
    this.height = args.height
    this.keyCode = args.keyCode
  }

  getX(): number {
    return this.x
  }

  getY(): number {
    return this.y
  }

  getWidth(): number {
    return this.width
  }

  getHeight(): number {
    return this.height
  }

  getKeyCode(): number {
    return this.keyCode
  }

  serialize(): NiaKeyDescriptionSerialized {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      keyCode: this.keyCode,
    }
  }

  static deserialize(serialized: NiaKeyDescriptionSerialized): NiaKeyDescription {
    const args: NiaKeyDescriptionObject = serialized

    return new NiaKeyDescription(args)
  }

  toPB(): KeyDescription {
    const keyDescriptionPB: KeyDescription = new KeyDescription()

    keyDescriptionPB.setX(this.x)
    keyDescriptionPB.setY(this.y)
    keyDescriptionPB.setWidth(this.width)
    keyDescriptionPB.setHeight(this.height)
    keyDescriptionPB.setKeyCode(this.keyCode)

    return keyDescriptionPB
  }

  static fromPB(keyDescriptionPB: KeyDescription): NiaKeyDescription {
    const x: number = keyDescriptionPB.getX()
    const y: number = keyDescriptionPB.getY()
    const width: number = keyDescriptionPB.getWidth()
    const height: number = keyDescriptionPB.getHeight()
    const keyCode: number = keyDescriptionPB.getKeyCode()

    const object: NiaKeyDescriptionObject = {
      x,
      y,
      width,
      height,
      keyCode
    }

    return new NiaKeyDescription(object)
  }
}

