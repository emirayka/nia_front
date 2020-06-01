// @ts-ignore
import {createStdout} from 'vue-command'

import store from '@/store'
import {parseArguments} from '@/views/terminal/commands/lib'

const constructHelpMessage = () => {
  let string = 'Usage: <span style="color: lightgreen">device-enable DEVICE_ID</span>.<br>'

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

    return new Promise((resolve) => {
      const handler = (message: string) => {
        resolve(createStdout(message))
      }

      store.commit.Terminal.addHandler(handler)

      store.dispatch.Connection.defineDevice({
        deviceId
      })
    })
  }
  catch(e) {
    return createStdout(`Error ${e.getName()}:${e.getMessage()}`)
  }
}
