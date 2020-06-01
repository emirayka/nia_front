// @ts-ignore
import {createStdout} from 'vue-command'

import store from '@/store'
import {mapStringToKeyCode, NiaAction, NiaKey, NiaKeyChord, NiaMapping, NiaModifierDescription} from '@/utils'
import {parseAction, parseArguments} from '@/views/terminal/commands/lib'

const constructHelpMessage = () => {
  let s = 'Usage: <span style="color: lightgreen">change-mapping KEY-CHORDS ACTION</span><br>.'

  s += `Examples:<br>`
  s += `&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: lightgreen">change-mapping 1:Caps+1:v text-type test</span><br>`

  return s
}

// @ts-ignore
export default (context) => {
  const args: Array<string> = parseArguments(context._.slice(1))

  if (args.length === 1 && args[0] === 'help') {
    return createStdout(`<br>${constructHelpMessage()}`)
  }

  if (args.length <= 1) {
    return createStdout(`Invalid usage. ${constructHelpMessage()}`)
  }

  const keyChordsString: string = args[0]
  const keyChords: Array<NiaKeyChord | null> = keyChordsString.split(' ')
    .map((keyChordString) => NiaKeyChord.fromString(keyChordString))

  const correctKeyChords: Array<NiaKeyChord> = []

  for (const keyChord of keyChords) {
    if (keyChord === null) {
      return createStdout(`Invalid key chord.`)
    }

    correctKeyChords.push(keyChord)
  }

  const action: NiaAction | null = parseAction(args.slice(1))

  if (action === null) {
    return createStdout(`Invalid mapping.`)
  }

  return new Promise((resolve) => {
    const handler = (message: string) => {
      resolve(createStdout(message))
    }

    store.commit.Terminal.addHandler(handler)

    store.dispatch.Connection.changeMapping({
      keyChords: correctKeyChords,
      action: action
    })
  })
}
