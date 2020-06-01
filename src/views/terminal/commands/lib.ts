import {
  NiaAction,
  NiaActionExecuteCode, NiaActionExecuteFunction, NiaActionExecuteOSCommand,
  NiaActionKeyClick,
  NiaActionKeyPress,
  NiaActionKeyRelease, NiaActionMouseAbsoluteMove, NiaActionMouseButtonClick,
  NiaActionMouseButtonPress, NiaActionMouseButtonRelease, NiaActionMouseRelativeMove, NiaActionTextType, NiaActionWait,
  NiaNamedAction,
} from '@/utils'

export const parseArguments = (args: Array<string>) => {
  const correctArgs: Array<string> = []
  let lastArg: string = ''

  for (const arg of args) {
    if (arg.endsWith('\\')) {
      if (lastArg === '') {
        lastArg = arg.slice(0, arg.length - 1)
      } else {
        lastArg += ' '
        lastArg += arg.slice(0, arg.length - 1)
      }
    } else {
      if (lastArg === '') {
        lastArg = arg
      } else {
        lastArg += ' '
        lastArg += arg
      }

      correctArgs.push(lastArg)
      lastArg = ''
    }
  }

  if (lastArg !== '') {
    if (lastArg.endsWith('\\')) {
      correctArgs.push(lastArg.slice(0, lastArg.length - 1))
    } else {
      correctArgs.push(lastArg)
    }
  }

  return correctArgs
}

export const parseAction = (args: Array<string>): NiaAction | null => {
  if (args.length === 0) {
    return null
  }

  switch (args[0]) {
    case 'key-press':
      if (args.length === 2) {
        const keyCode: number = +args[1]

        if (keyCode === keyCode) {
          const action: NiaAction = new NiaActionKeyPress({
            keyCode
          }).toAction()

          return action
        }
      }
      break

    case 'key-click':
      if (args.length === 2) {
        const keyCode: number = +args[1]

        if (keyCode === keyCode) {
          const action: NiaAction = new NiaActionKeyClick({
            keyCode
          }).toAction()

          return action
        }
      }
      break

    case 'key-release':
      if (args.length === 2) {
        const keyCode: number = +args[1]

        if (keyCode === keyCode) {
          const action: NiaAction = new NiaActionKeyRelease({
            keyCode
          }).toAction()

          return action
        }
      }
      break

    case 'mouse-button-press':
      if (args.length === 2) {
        const buttonCode: number = +args[1]

        if (buttonCode === buttonCode) {
          const action: NiaAction = new NiaActionMouseButtonPress({
            buttonCode
          }).toAction()

          return action
        }
      }
      break

    case 'mouse-button-click':
      if (args.length === 2) {
        const buttonCode: number = +args[1]

        if (buttonCode === buttonCode) {
          const action: NiaAction = new NiaActionMouseButtonClick({
            buttonCode
          }).toAction()

          return action
        }
      }
      break

    case 'mouse-button-release':
      if (args.length === 2) {
        const buttonCode: number = +args[1]

        if (buttonCode === buttonCode) {
          const action: NiaAction = new NiaActionMouseButtonRelease({
            buttonCode
          }).toAction()

          return action
        }
      }
      break

    case 'mouse-absolute-move':
      if (args.length === 3) {
        const x: number = +args[1]
        const y: number = +args[2]

        if (x === x && y === y) {
          const action: NiaAction = new NiaActionMouseAbsoluteMove({
            x,
            y
          }).toAction()

          return action
        }
      }
      break

    case 'mouse-relative-move':
      if (args.length === 3) {
        const dx: number = +args[1]
        const dy: number = +args[2]

        if (dx === dx && dy === dy) {
          const action: NiaAction = new NiaActionMouseRelativeMove({
            dx,
            dy
          }).toAction()

          return action
        }
      }
      break

    case 'text-type':
      if (args.length === 2) {
        const text: string = args[1]

        const action: NiaAction = new NiaActionTextType({
          text
        }).toAction()

        return action
      }
      break

    case 'wait':
      if (args.length === 2) {
        const ms: number = +args[1]

        if (ms === ms) {
          const action: NiaAction = new NiaActionWait({
            ms
          }).toAction()

          return action
        }
      }
      break

    case 'execute-code':
      if (args.length === 2) {
        const code: string = args[1]

        const action: NiaAction = new NiaActionExecuteCode({
          code
        }).toAction()

        return action
      }
      break

    case 'execute-function':
      if (args.length === 2) {
        const functionName: string = args[1]

        const action: NiaAction = new NiaActionExecuteFunction({
          functionName
        }).toAction()

        return action
      }
      break

    case 'execute-os-command':
      if (args.length === 2) {
        const osCommand: string = args[1]

        const action: NiaAction = new NiaActionExecuteOSCommand({
          osCommand
        }).toAction()

        return action
      }
      break
  }

  return null
}

export const parseNamedAction = (args: Array<string>): NiaNamedAction | null => {
  if (args.length === 0) {
    return null
  }

  const actionName: string = args[0]
  const action: NiaAction | null = parseAction(args.slice(1))

  if (action !== null) {
    return action.toNamed(actionName)
  }

  return null
}
