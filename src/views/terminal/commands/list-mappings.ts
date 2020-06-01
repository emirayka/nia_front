// @ts-ignore
import {createStdout} from 'vue-command'

import store from '@/store'
import {createLocalVue} from '@vue/test-utils'
import {parseArguments} from '@/views/terminal/commands/lib'
import {NiaMapping} from '@/utils'

const constructHelpMessage = () => {
  let string = 'Usage: <span style="color: lightgreen">list-mappings</span>.<br>'

  return string
}

const constructMappingDescription = (mapping: NiaMapping): string => {
  let mappingDescription: string = 'Mapping '

  mappingDescription += '<span style="color: lightgreen">'
  mappingDescription += mapping.getKeyChords()
    .map(keyChord => keyChord.stringify())
    .join(' ')
  mappingDescription += '</span>'

  mappingDescription += ` => <span style="color: lightsalmon">${mapping.getAction().stringify()}</span>`

  return mappingDescription
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

  let mappingsDescription: string = ''
  const mappings: Array<NiaMapping> = store.getters.Keymapping.Mappings.definedMappings

  for (const mapping of mappings) {
    mappingsDescription += constructMappingDescription(mapping)
    mappingsDescription += '<br>'
  }

  return createStdout(mappingsDescription)
}
