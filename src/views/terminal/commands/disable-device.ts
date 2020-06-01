// @ts-ignore
import {createStdout} from 'vue-command'

import store from '@/store'
import {NiaDeviceInfo} from '@/utils'
import {parseArguments} from '@/views/terminal/commands/lib'

const constructHelpMessage = () => {
  let string = 'Usage: <span style="color: lightgreen">device-disable DEVICE_ID</span>.<br>'

  return string
}

// @ts-ignore
export default (context) => {
  const args: Array<string> = parseArguments(context._.slice(1))

  if (args.length !== 1) {
    return createStdout(`Invalid usage. <br>${constructHelpMessage()}`)
  }

  if (args[0] === 'help') {
    return createStdout(`${constructHelpMessage()}`)
  }

  try {
    const deviceId: number = parseInt(args[0])
    const device: NiaDeviceInfo | null = store.getters.Keymapping.DevicesInfo.getDeviceById(deviceId)

    if (device === null) {
      return createStdout(`Cannot find device with id: ${deviceId}`)
    }

    return new Promise((resolve) => {
      const handler = (message: string) => {
        resolve(createStdout(message))
      }

      store.commit.Terminal.addHandler(handler)
      store.dispatch.Connection.removeDevice({
        devicePath: device.getDevicePath()
      })
    })
  }
  catch(e) {
    return createStdout(`Error ${e.getName()}:${e.getMessage()}`)
  }
}
