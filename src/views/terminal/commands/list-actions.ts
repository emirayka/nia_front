// @ts-ignore
import {createStdout} from 'vue-command'

import store from '@/store'
import {NiaDeviceInfo, NiaNamedAction} from '@/utils'
import {createLocalVue} from '@vue/test-utils'
import {parseArguments} from '@/views/terminal/commands/lib'

const constructHelpMessage = () => {
  let string = 'Usage: <span style="color: lightgreen">list-actions</span>.<br>'

  return string
}

const constructDeviceDescription = (action: NiaNamedAction): string => {
  let deviceDescription: string = ''

  deviceDescription += `Action <span style="color: lightgreen">${action.getActionName()}</span><br>`
  deviceDescription += `Type: <span style="color: lightgreen">${action.getAction().getActionTypeName()}</span>(`
  deviceDescription += `<span style="color: lightgreen">${action.getAction().getFirstArgument()}</span>`

  const secondArgument: string = action.getAction().getSecondArgument()

  if (secondArgument !== '') {
    deviceDescription += `, <span style="color: lightgreen">${action.getAction().getSecondArgument()}</span>`
  }

  deviceDescription += `)<br>`

  return deviceDescription
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

  const definedActions: Array<NiaNamedAction> = store.getters.Keymapping.Actions.definedActions

  let actionsDescription: string = ''

  for (const namedAction of definedActions) {
    actionsDescription += `${constructDeviceDescription(namedAction)}`
    actionsDescription += `<br>`
  }

  return createStdout(actionsDescription)
}
