// @ts-ignore
import {createStdout} from 'vue-command'

import store from '@/store'
import {mapStringToKeyCode, NiaAction, NiaKey, NiaKeyChord, NiaMapping, NiaModifierDescription} from '@/utils'
import {parseAction, parseArguments} from '@/views/terminal/commands/lib'

const constructHelpMessage = () => {
  let s = 'Usage: <span style="color: lightgreen">remove-mapping KEY-CHORDS</span><br>.'

  s += `Examples:<br>`
  s += `&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: lightgreen">remove-mapping 1:Caps+1:v</span><br>`

  return s
}

// @ts-ignore
export default (context) => {
  const args: Array<string> = parseArguments(context._.slice(1))

  if (args.length === 1 && args[0] === 'help') {
    return createStdout(`<br>${constructHelpMessage()}`)
  }

  if (args.length === 0) {
    return createStdout(`Invalid usage. ${constructHelpMessage()}`)
  }

  const keyChords: Array<NiaKeyChord | null> = args[0].split(' ')
    .map((keyChordString) => NiaKeyChord.fromString(keyChordString))

  const correctKeyChords: Array<NiaKeyChord> = []

  for (const keyChord of keyChords) {
    if (keyChord === null) {
      return createStdout(`Invalid key chord.`)
    }

    correctKeyChords.push(keyChord)
  }

  return new Promise((resolve) => {
    const handler = (message: string) => {
      resolve(createStdout(message))
    }

    store.commit.Terminal.addHandler(handler)

    return store.dispatch.Connection.removeMapping({
      keyChords: correctKeyChords
    })
  })
}
