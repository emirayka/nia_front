// @ts-ignore
import {createStdout} from 'vue-command'

import store from '@/store'
import {mapStringToKeyCode, NiaKey, NiaModifierDescription} from '@/utils'
import {parseArguments} from '@/views/terminal/commands/lib'

const constructHelpMessage = () => {
  const s = 'Usage: <span style="color: lightgreen">clear-modifiers</span><br>.'

  return s
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

  return new Promise((resolve) => {
    const modifiers: Array<NiaModifierDescription> = store.getters.Keymapping.Modifiers.definedModifiers

    const modifierCount: number = modifiers.length
    let resolvedDeletions: number = 0

    const handler = (message: string) => {
      resolvedDeletions += 1

      if (resolvedDeletions === modifierCount) {
        resolve(createStdout("Success."))
      }
    }

    for (const modifier of modifiers) {
      const key: NiaKey = modifier.getKey()

      store.commit.Terminal.addHandler(handler)

      store.dispatch.Connection.removeModifier({
        keyCode: key.getKeyCode(),
        deviceId: key.getDeviceId()
      })
    }
  })
}
