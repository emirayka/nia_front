import {KeyDescription} from 'nia-protocol-js'
import {SerializablePB} from '@/utils'

export class NiaKeyDescription implements SerializablePB<NiaKeyDescription, KeyDescription> {
  private readonly x: number
  private readonly y: number
  private readonly width: number
  private readonly height: number
  private readonly keyCode: number

  constructor(x: number, y: number, width: number, height: number, keyCode: number) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.keyCode = keyCode
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

    return new NiaKeyDescription(
      x,
      y,
      width,
      height,
      keyCode
    )
  }
}

