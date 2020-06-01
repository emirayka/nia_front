// @ts-ignore
import {createStdout} from 'vue-command'

import store from '@/store'
import {parseArguments} from '@/views/terminal/commands/lib'

const makeColoredDescription = (command: string, description: string) => {
  return `&nbsp;&nbsp;<span style="color: lightgreen">${command}</span>: ${description}`
}

const subcommands = [
  makeColoredDescription('action-send help', 'Print this help message.'),

  makeColoredDescription('action-send key-press key-code', 'Send key press action.'),
  makeColoredDescription('action-send key-click key-code', 'Send key click action.'),
  makeColoredDescription('action-send key-release key-code', 'Send key release action.'),

  makeColoredDescription('action-send mouse-button-press button-code', 'Send mouse-button press action.'),
  makeColoredDescription('action-send mouse-button-click button-code', 'Send mouse-button click action.'),
  makeColoredDescription('action-send mouse-button-release button-code', 'Send mouse-button release action.'),

  makeColoredDescription('action-send mouse-absolute-move x y', 'Send mouse absolute move action.'),
  makeColoredDescription('action-send mouse-relative-move dx dy', 'Send mouse relative move action.'),

  makeColoredDescription('action-send text-type text', 'Send text type action.'),
  makeColoredDescription('action-send wait ms', 'Send ms action.'),

  makeColoredDescription('action-send execute-code code', 'Send execute code action.'),
  makeColoredDescription('action-send execute-function function-name', 'Send execute function action.'),
  makeColoredDescription('action-send execute-os-command os-command', 'Send execute os command action.'),
]

const constructHelpMessage = () => {
  let string = 'Usage: <span style="color: lightgreen">action-send ACTION-TYPE ACTION-ARGS</span><br>'

  string += 'Examples:<br>'

  for (let subcommand of subcommands) {
    string += subcommand
    string += '<br>'
  }

  return string
}

const sendExecuteCode = (code: string) => {
  return new Promise((resolve) => {
    store.dispatch.Connection.executeTerminalCode({
      code,
    })

    const handler = (message: string) => {
      resolve(createStdout(message))
    }

    store.commit.Terminal.addHandler(handler)
  })
}

// @ts-ignore
export default (context) => {
  const args: Array<string> = parseArguments(context._.slice(1))

  if (args.length === 0) {
    return createStdout(`Invalid usage. <br>${constructHelpMessage()}`)
  }

  switch (args[0]) {
    case 'help':
      return createStdout(`Invalid usage. <br>${constructHelpMessage()}`)

    case 'key-press':
      if (args.length === 2) {
        return sendExecuteCode(`(action:send-key-press ${args[1]})`)
      }

    case 'key-click':
      if (args.length === 2) {
        return sendExecuteCode(`(action:send-key-click ${args[1]})`)
      }

    case 'key-release':
      if (args.length === 2) {
        return sendExecuteCode(`(action:send-key-release ${args[1]})`)
      }

    case 'mouse-button-press':
      if (args.length === 2) {
        return sendExecuteCode(`(action:send-mouse-button-press ${args[1]})`)
      }

    case 'mouse-button-click':
      if (args.length === 2) {
        return sendExecuteCode(`(action:send-mouse-button-click ${args[1]})`)
      }

    case 'mouse-button-release':
      if (args.length === 2) {
        return sendExecuteCode(`(action:send-mouse-button-release ${args[1]})`)
      }

    case 'mouse-absolute-move':
      if (args.length === 3) {
        return sendExecuteCode(`(action:send-mouse-absolute-move ${args[1]} ${args[2]})`)
      }

    case 'mouse-relative-move':
      if (args.length === 3) {
        return sendExecuteCode(`(action:send-mouse-relative-move ${args[1]} ${args[2]})`)
      }

    case 'text-type':
      if (args.length === 2) {
        return sendExecuteCode(`(action:send-text-type ${args[1]})`)
      }

    case 'wait':
      if (args.length === 2) {
        return sendExecuteCode(`(action:send-wait ${args[1]})`)
      }

    case 'execute-code':
      return sendExecuteCode(args.slice(1).join(' '))

    case 'execute-function':
      if (args.length === 2) {
        return sendExecuteCode(`(${args[1]})`)
      }

    case 'execute-os-command':
      return sendExecuteCode(`(action:send-execute-os-command ${args.slice(1).join(' ')})`)
  }

  return createStdout(`Invalid usage. <br>${constructHelpMessage()}`)
}
