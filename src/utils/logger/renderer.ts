import stringify from 'string.ify'

interface Logger {
  failure: (arg: any) => void,
  error: (arg: any) => void,
  debug: (arg: any) => void,
  warn: (arg: any) => void,
  data: (arg: any) => void,
  info: (arg: any) => void,
  verbose: (arg: any) => void,
  silly: (arg: any) => void,
}

interface LoggerContainer {
  [s: string]: Logger
}

const makeLogger = (category: string): Logger => {
  return {
    failure: arg => {
      console.error(category)
      console.error(arg)
    },
    error: arg =>  {
      console.error(category)
      console.error(arg)
    },
    debug: arg =>  {
      console.log(category)
      console.log(arg)
    },
    warn: arg =>  {
      console.log(category)
      console.log(arg)
    },
    data: arg =>  {
      console.log(category)
      console.log(arg)
    },
    info: arg =>  {
      console.log(category)
      console.log(arg)
    },
    verbose: arg =>  {
      console.log(category)
      console.log(arg)
    },
    silly: arg =>  {
      console.log(category)
      console.log(arg)
    },
  }
}

const container: LoggerContainer = {}

export default (category: string): Logger => {
  if (!container.hasOwnProperty(category)) {
    container[category] = makeLogger(category)
  }

  return container[category]
}
