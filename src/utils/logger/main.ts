import winston from 'winston'
// @ts-ignore
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
    const time: string = new Date().toLocaleString()

    if (typeof info.message === 'object' && info.message !== null) {
      let objectString: string = stringify
        .maxDepth(3)
        .maxArrayLength(10)
        (info.message)

      info.message = `${time}\n[${opts.label}]:\n ${objectString}\n`
    } else {
      info.message = `${time}\n[${opts.label}]:\n ${info.message}\n`
    }
  }

  return info
})

winston.addColors(levels.colors)

export default (category: string) => {
  if (!winston.loggers.has(category)) {
    winston.loggers.add(category, {
      format: winston.format.combine(
        customLabelFormat({ label: category }),
        winston.format.colorize({ all: true }),
        winston.format.simple(),
      ),
      levels: levels.levels,
      transports: [
        new winston.transports.Console({
          level: 'silly',
        }),
      ],
    })
  }

  return winston.loggers.get(category)
}
