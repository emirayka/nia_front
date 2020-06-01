// @ts-ignore
import {createStdout} from 'vue-command'

import store from '@/store'
import {parseArguments} from '@/views/terminal/commands/lib'
import {NiaMapping} from '@/utils'

const constructHelpMessage = () => {
  const s = 'Usage: <span style="color: lightgreen">clear-mappings</span><br>.'

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
    const mappings: Array<NiaMapping> = store.getters.Keymapping.Mappings.definedMappings

    const mappingCount: number = mappings.length
    let resolvedDeletions: number = 0

    const handler = (message: string) => {
      resolvedDeletions += 1

      if (resolvedDeletions === mappingCount) {
        resolve(createStdout("Success."))
      }
    }

    for (const mapping of mappings) {
      store.commit.Terminal.addHandler(handler)

      store.dispatch.Connection.removeMapping({
        keyChords: mapping.getKeyChords()
      })
    }
  })
}
