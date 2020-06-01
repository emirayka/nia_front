// @ts-ignore
import {createStdout} from 'vue-command'
import {parseArguments} from '@/views/terminal/commands/lib'

const constructHelpMessage = () => {
  let string = 'Usage: <span style="color: lightgreen">echo ARGUMENTS</span>.<br>'

  return string
}

// @ts-ignore
export default (context) => {
  const args: Array<string> = parseArguments(context._.slice(1))

  if (args.length === 1 && args[0] === 'help') {
    return createStdout(`${constructHelpMessage()}`)
  }

  if (args.length === 0) {
    return createStdout(`Invalid usage. ${constructHelpMessage()}`)
  }

  let result: string = args.join(' ')

  return createStdout(result)
}
