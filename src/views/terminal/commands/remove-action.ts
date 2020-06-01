// @ts-ignore
import {createStdout} from 'vue-command'

import store from '@/store'
import {mapStringToKeyCode, NiaKey, NiaModifierDescription} from '@/utils'
import {parseArguments} from '@/views/terminal/commands/lib'

const constructHelpMessage = () => {
  let s = 'Usage: <span style="color: lightgreen">remove-action ACTION-NAME</span><br>.'

  return s
}

// @ts-ignore
export default (context) => {
  const args: Array<string> = parseArguments(context._.slice(1))

  if (args.length === 1 && args[0] === 'help') {
    return createStdout(`${constructHelpMessage()}`)
  }

  if (args.length !== 1) {
    return createStdout(`Invalid usage. <br>${constructHelpMessage()}`)
  }

  const actionName: string = args[0]

  return new Promise((resolve) => {
    const handler = (message: string) => {
      resolve(createStdout(message))
    }

    store.commit.Terminal.addHandler(handler)

    store.dispatch.Connection.removeAction({
      actionName
    })
  })
}
