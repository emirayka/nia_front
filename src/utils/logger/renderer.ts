import winston from 'winston'
import stringify from 'string.ify'
import BrowserConsole from 'winston-transport-browserconsole'

const container = new winston.Container()

const levels = {
  levels: {
    failure: 0,
    error: 1,
    debug: 2,
    warn: 3,
    data: 4,
    info: 5,
    verbose: 6,
    silly: 7,
  },
  colors: {
    failure: 'red',
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'cyan',
    verbose: 'green',
    silly: 'magenta',
  },
}

const customLabelFormat = winston.format((info, opts) => {
  if (opts.label !== undefined) {
    if (typeof info.message === 'object' && info.message !== null) {
      let objectString: string = stringify
        .maxDepth(3)
        .maxArrayLength(10)
        (info.message)

      info.message = `[${opts.label}]:\n ${objectString}\n`
    } else {
      info.message = `[${opts.label}]:\n ${info.message}\n`
    }
  }

  return info
})

winston.addColors(levels.colors)

export default (category: string) => {
  if (!winston.loggers.has(category)) {
    winston.loggers.add(category, {
      levels: levels.levels,
      transports: [
        new BrowserConsole(
          {
            format: winston.format.simple(),
            level: 'silly'
          }
        )
      ],
    })
  }

  return winston.loggers.get(category)
}
