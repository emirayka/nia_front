import {Key, Key1, Key2} from 'nia-protocol-js'

import {mapStringToKeyCode, SerializablePB} from '@/utils'
import SerializableObject from '@/utils/serializable-object'

import {
  mapKeyCodeToString
} from '@/utils'

export interface NiaKeyObject {
  keyCode: number
  deviceId: number | null
}

export type NiaKeySerialized = NiaKeyObject

export class NiaKey implements SerializablePB<NiaKey, Key>, SerializableObject<NiaKey, NiaKeySerialized> {
  private readonly deviceId: number | null
  private readonly keyCode: number

  constructor(args: NiaKeyObject) {
    this.keyCode = args.keyCode
    this.deviceId = args.deviceId
  }

  toGenericKey(): NiaKey {
    return new NiaKey({
      keyCode: this.keyCode,
      deviceId: null
    })
  }

  getDeviceId(): number | null {
    return this.deviceId
  }

  getKeyCode(): number {
    return this.keyCode
  }

  stringify(): string {
    const keyCode: string | null = mapKeyCodeToString(this.keyCode)

    if (keyCode === null) {
      return 'Unknown'
    }

    if (this.deviceId !== null) {
      return `${this.deviceId}:${keyCode}`
    } else {
      return `${keyCode}`
    }
  }

  equals(other: NiaKey): boolean {
    if (this.deviceId === null || other.deviceId === null) {
      return this.keyCode === other.keyCode
    }

    return this.deviceId === other.deviceId && this.keyCode === other.keyCode
  }

  same(other: NiaKey): boolean {
    return this.deviceId === other.deviceId && this.keyCode === other.keyCode
  }

  serialize(): NiaKeySerialized {
    return {
      keyCode: this.keyCode,
      deviceId: this.deviceId
    }
  }

  static deserialize(serialized: NiaKeySerialized): NiaKey {
    const args: NiaKeyObject = serialized

    return new NiaKey(args)
  }

  toPB(): Key {
    const keyPB: Key = new Key()

    if (this.deviceId === null) {
      const key1PB = new Key1()

      key1PB.setKeyCode(this.keyCode)

      keyPB.setKey1(key1PB)
    } else {
      const key2PB = new Key2()

      key2PB.setDeviceId(this.deviceId)
      key2PB.setKeyCode(this.keyCode)

      keyPB.setKey2(key2PB)
    }

    return keyPB
  }

  static fromPB(keyPB: Key): NiaKey {
    let keyCode: number | null
    let deviceId: number | null
    let args: NiaKeyObject | null = null

    switch (keyPB.getKeyCase()) {
      case Key.KeyCase.KEY_1:
        const key1PB: Key1 | undefined = keyPB.getKey1()

        if (key1PB === undefined) {
          throw new Error('Key1 is undefined')
        }

        keyCode = key1PB.getKeyCode()

        args = {
          keyCode,
          deviceId: null
        }
        break

      case Key.KeyCase.KEY_2:
        const key2PB: Key2 | undefined = keyPB.getKey2()

        if (key2PB === undefined) {
          throw new Error('Key2 is undefined')
        }

        keyCode = key2PB.getKeyCode()
        deviceId = key2PB.getDeviceId()

        args = {
          keyCode,
          deviceId
        }
        break
    }

    if (args === null) {
      throw new Error('Unknown key type')
    }

    return new NiaKey(args)
  }

  static fromString(s: string): NiaKey | null {
    const splitted: Array<string> = s.split(':')

    let deviceId: number | null | undefined = null
    let keyCode: number | null | undefined = null

    switch (splitted.length) {
      case 1:
        keyCode = mapStringToKeyCode(splitted[0])
        break

      case 2:
        deviceId = +splitted[0]
        keyCode = mapStringToKeyCode(splitted[1])
        break
    }
    console.log(deviceId)
    console.log(keyCode)

    // if nan
    if (deviceId === undefined) {
      return null
    }

    if (deviceId !== deviceId) {
      return null
    }

    if (keyCode === null || keyCode === undefined) {
      return null
    }

    return new NiaKey({
      deviceId,
      keyCode
    })
  }
}
