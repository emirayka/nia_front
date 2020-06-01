// @ts-ignore
import {createStdout} from 'vue-command'

import store from '@/store'
import {mapStringToKeyCode, NiaKey, NiaModifierDescription, NiaNamedAction} from '@/utils'
import {parseArguments} from '@/views/terminal/commands/lib'

const constructHelpMessage = () => {
  const s = 'Usage: <span style="color: lightgreen">clear-actions</span><br>.'

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
    const actions: Array<NiaNamedAction> = store.getters.Keymapping.Actions.definedActions

    const actionCount: number = actions.length
    let resolvedDeletions: number = 0

    const handler = (message: string) => {
      resolvedDeletions += 1
      console.log(resolvedDeletions)

      if (resolvedDeletions === actionCount) {
        resolve(createStdout("Success."))
      }
    }

    for (const action of actions) {
      store.commit.Terminal.addHandler(handler)

      store.dispatch.Connection.removeAction({
        actionName: action.getActionName()
      })
    }
  })
}
