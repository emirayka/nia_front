// @ts-ignore
import {createStdout} from 'vue-command'

const makeCommandDescription = (name: string, description: string) => {
  return `&nbsp;&nbsp;- <span style="color: lightgreen">${name}</span>: ${description}`
}

const commandDescriptions = [
  makeCommandDescription('help', 'Prints that help message.'),
  makeCommandDescription('version', 'Echoes server version and info.'),
  makeCommandDescription('echo', 'Echoes args.'),

  makeCommandDescription('list-devices', 'Prints devices list.'),
  makeCommandDescription('enable-device', 'Enable device for remapping.'),
  makeCommandDescription('disable-device', 'Disable device for remapping.'),

  makeCommandDescription('list-modifiers', 'Prints defined modifiers.'),
  makeCommandDescription('define-modifier', 'Defines new modifiers.'),
  makeCommandDescription('remove-modifier', 'Removes modifier.'),
  makeCommandDescription('clear-modifiers', 'Clears defined modifiers.'),

  makeCommandDescription('list-actions', 'Prints defined actions.'),
  makeCommandDescription('define-action', 'Defines new action.'),
  makeCommandDescription('remove-action', 'Removes action.'),
  makeCommandDescription('clear-actions', 'Clears defined actions.'),
  makeCommandDescription('send-action', 'Sends action for execution.'),

  makeCommandDescription('list-mappings', 'Prints defined mappings.'),
  makeCommandDescription('define-mapping', 'Defines new mapping.'),
  makeCommandDescription('change-mapping', 'Changes action of defined mapping.'),
  makeCommandDescription('remove-mapping', 'Removes defined mapping.'),
  makeCommandDescription('clear-mappings', 'Clears defined mappings.'),

  makeCommandDescription('start-listening', 'Start listening.'),
  makeCommandDescription('stop-listening', 'Stop listening.'),
]

const helpMessage = () => {
  let string = 'Available commands: <br>'

  for (const commandDescription of commandDescriptions) {
      string += (`${commandDescription}`)
    string += '<br>'
  }

  return string
}

export default () => {
  return createStdout(helpMessage())
}
