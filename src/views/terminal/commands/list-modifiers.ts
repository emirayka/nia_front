// @ts-ignore
import {createStdout} from 'vue-command'

import store from '@/store'
import {NiaDeviceInfo, NiaModifierDescription} from '@/utils'
import {createLocalVue} from '@vue/test-utils'
import {parseArguments} from '@/views/terminal/commands/lib'

const constructHelpMessage = () => {
  let string = 'Usage: <span style="color: lightgreen">list-modifiers</span>.<br>'

  return string
}

const constructModifierDescription = (modifier: NiaModifierDescription): string => {
  const alias: string = modifier.getAlias()

  if (alias === '') {
    return `Modifier: <span style="color: lightgreen">${modifier.getKey().stringify()}</span>`
  } else {
    return `Modifier "${alias}": <span style="color: lightgreen">${modifier.getKey().stringify()}</span>`
  }
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

  let modifiersDescription: string = ''
  const modifiers: Array<NiaModifierDescription> = store.getters.Keymapping.Modifiers.definedModifiers

  for (const modifier of modifiers) {
    modifiersDescription += constructModifierDescription(modifier)
    modifiersDescription += '<br>'
  }

  return createStdout(modifiersDescription)
}
