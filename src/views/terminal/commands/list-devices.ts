// @ts-ignore
import {createStdout} from 'vue-command'

import store from '@/store'
import {NiaDeviceInfo} from '@/utils'
import {createLocalVue} from '@vue/test-utils'
import {parseArguments} from '@/views/terminal/commands/lib'

const constructHelpMessage = () => {
  let string = 'Usage: <span style="color: lightgreen">list-devices</span>.<br>'

  return string
}

const constructDeviceDescription = (deviceInfo: NiaDeviceInfo): string => {
  let deviceDescription: string = ''

  deviceDescription += `Device: <span style="color: lightgreen">${deviceInfo.getDeviceName()}</span>.<br>`
  deviceDescription += `Device id: <span style="color: lightgreen">${deviceInfo.getDeviceId()}</span>.<br>`
  deviceDescription += `Device path: <span style="color: lightgreen">${deviceInfo.getDevicePath()}</span>.<br>`
  deviceDescription += `Enabled: <span style="color: lightgreen">${deviceInfo.isDefined()}</span>.<br><br>`

  return deviceDescription
}

// @ts-ignore
export default (context) => {
  const args: Array<string> = parseArguments(context._.slice(1))

  if (args.length === 1 && args[0] === 'help') {
    return createStdout(`${constructHelpMessage()}`)
  }

  if (args.length !== 0) {
    return createStdout(`Invalid usage. <br>${constructHelpMessage()}`)
  }

  let devicesDescription: string = ''
  const devices: Array<NiaDeviceInfo> = store.getters.Keymapping.DevicesInfo.devices

  for (const device of devices) {
    devicesDescription += constructDeviceDescription(device)
  }

  return createStdout(devicesDescription)
}
