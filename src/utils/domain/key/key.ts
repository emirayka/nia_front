import {Key, Key1, Key2} from 'nia-protocol-js'

import {SerializablePB} from '@/utils'

export class NiaKey implements SerializablePB<NiaKey, Key>{
  private readonly deviceId: number | null
  private readonly keyCode: number

  constructor(keyCode: number, deviceId: number | null = null) {
    this.keyCode = keyCode
    this.deviceId = deviceId
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

    switch (keyPB.getKeyCase()) {
      case Key.KeyCase.KEY_1:
        const key1PB: Key1 | undefined = keyPB.getKey1()

        if (key1PB === undefined) {
          throw new Error('Key1 is undefined')
        }

        keyCode = key1PB.getKeyCode()

        return new NiaKey(keyCode)

      case Key.KeyCase.KEY_2:
        const key2PB: Key2 | undefined = keyPB.getKey2()

        if (key2PB === undefined) {
          throw new Error('Key2 is undefined')
        }

        keyCode = key2PB.getKeyCode()
        deviceId = key2PB.getDeviceId()

        return new NiaKey(keyCode, deviceId)

      default:
        throw new Error('Unknown key type')
    }
  }
}