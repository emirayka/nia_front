// @ts-ignore
import {createStdout} from 'vue-command'

import store from '@/store'
import {mapStringToKeyCode, NiaKey, NiaModifierDescription} from '@/utils'
import {parseArguments} from '@/views/terminal/commands/lib'

const constructHelpMessage = () => {
  let s = 'Usage: <span style="color: lightgreen">define-modifier KEY-CODE [ALIAS]</span><br>.'
  s += '&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: lightgreen">define-modifier DEVICE-ID KEY-CODE [ALIAS]</span><br>.'

  return s
}

// @ts-ignore
export default (context) => {
  const args: Array<string> = parseArguments(context._.slice(1))

  if (args.length === 0 || args.length > 3) {
    return createStdout(`Invalid usage. <br>${constructHelpMessage()}`)
  }

  if (args[0] === 'help') {
    return createStdout(`${constructHelpMessage()}`)
  }

  let deviceId: number | null = null
  let keyCode: number | null = null
  let alias: string = ''

  if (args.length === 1) {
    keyCode = mapStringToKeyCode(args[0])

    if (keyCode === null) {
      keyCode = +args[0]
    }
  } else if (args.length === 2) {
    deviceId = +args[0]
    keyCode = mapStringToKeyCode(args[1])

    if (keyCode === null) {
      keyCode = +args[1]
    }

    // if nan then it's alias
    if (keyCode !== keyCode) {
      keyCode = deviceId
      deviceId = null
      alias = args[1]
    }
  } else {
    deviceId = +args[0]
    keyCode = mapStringToKeyCode(args[1])
    alias = args[2]
    
    if (keyCode !== keyCode) {
      keyCode = +args[1]
    }
  }

  if (keyCode === null || keyCode !== keyCode) {
    return createStdout('Key code is not valid')
  }

  if (deviceId !== deviceId) {
    return createStdout('Device id is not valid')
  }

  const key: NiaKey = new NiaKey({
    keyCode,
    deviceId,
  })

  const modifier: NiaModifierDescription = new NiaModifierDescription({
    key,
    alias
  })

  return new Promise((resolve) => {
    const handler = (message: string) => {
      resolve(createStdout(message))
    }

    store.commit.Terminal.addHandler(handler)

    store.dispatch.Connection.defineModifier({
      modifier
    })
  })
}
