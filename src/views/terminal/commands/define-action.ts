// @ts-ignore
import {createStdout} from 'vue-command'

import store from '@/store'
import {
  NiaActionExecuteCode, NiaActionExecuteFunction, NiaActionExecuteOSCommand,
  NiaActionKeyClick,
  NiaActionKeyPress,
  NiaActionKeyRelease, NiaActionMouseAbsoluteMove, NiaActionMouseButtonClick,
  NiaActionMouseButtonPress, NiaActionMouseButtonRelease, NiaActionMouseRelativeMove, NiaActionTextType, NiaActionWait,
  NiaNamedAction,
} from '@/utils'
import {parseArguments, parseNamedAction} from './lib'

const makeColoredDescription = (command: string, description: string) => {
  return `&nbsp;&nbsp;<span style="color: lightgreen">${command}</span>: ${description}`
}

const subcommands = [
  makeColoredDescription('define-action help', 'Print this help message.'),

  makeColoredDescription('define-action ACTION-NAME key-press KEY-CODE', 'Define key press action.'),
  makeColoredDescription('define-action ACTION-NAME key-click KEY-CODE', 'Define key click action.'),
  makeColoredDescription('define-action ACTION-NAME key-release KEY-CODE', 'Define key release action.'),

  makeColoredDescription('define-action ACTION-NAME mouse-button-press BUTTON-CODE', 'Define mouse-button press action.'),
  makeColoredDescription('define-action ACTION-NAME mouse-button-click BUTTON-CODE', 'Define mouse-button click action.'),
  makeColoredDescription('define-action ACTION-NAME mouse-button-release BUTTON-CODE', 'Define mouse-button release action.'),

  makeColoredDescription('define-action ACTION-NAME mouse-absolute-move X Y', 'Define mouse absolute move action.'),
  makeColoredDescription('define-action ACTION-NAME mouse-relative-move DX DY', 'Define mouse relative move action.'),

  makeColoredDescription('define-action ACTION-NAME text-type TEXT', 'Define text type action.'),
  makeColoredDescription('define-action ACTION-NAME wait MS', 'Define ms action.'),

  makeColoredDescription('define-action ACTION-NAME execute-code CODE', 'Define execute code action.'),
  makeColoredDescription('define-action ACTION-NAME execute-function FUNCTION-NAME', 'Define execute function action.'),
  makeColoredDescription('define-action ACTION-NAME execute-os-command OS-COMMAND', 'Define execute os command action.'),
]

const constructHelpMessage = () => {
  let string = 'Usage: <span style="color: lightgreen">define-action ACTION-NAME ACTION-TYPE ACTION-ARGS</span><br>'

  string += 'Examples:<br>'

  for (let subcommand of subcommands) {
    string += subcommand
    string += '<br>'
  }

  return string
}

const sendDefineAction = (namedAction: NiaNamedAction) => {
  return new Promise((resolve) => {
    const handler = (message: string) => {
      resolve(createStdout(message))
    }

    store.commit.Terminal.addHandler(handler)

    store.dispatch.Connection.defineAction({
      namedAction
    })
  })
}

// @ts-ignore
export default (context) => {
  const args: Array<string> = parseArguments(context._.slice(1))

  if (args.length === 1 && args[0] === 'help') {
    return createStdout(`<br>${constructHelpMessage()}`)
  }

  if (args.length === 0) {
    return createStdout(`Invalid usage. <br>${constructHelpMessage()}`)
  }

  const namedAction: NiaNamedAction | null = parseNamedAction(args)

  if (namedAction !== null) {
    return sendDefineAction(namedAction)
  }

  return createStdout(`Invalid usage. <br>${constructHelpMessage()}`)
}
