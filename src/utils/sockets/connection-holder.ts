import WebSocket from 'ws'

import loggers from '@/utils/logger'
const logger = loggers('Connection Holder')

type WSMessage = string | Buffer | ArrayBuffer | Buffer[]

export type ConnectedHandler = () => void
export type MessageHandler = (message: WSMessage) => void
export type DisconnectedHandler = () => void

export interface ConnectionHolderArgs {
  port: number
  timeout: number
  connectedHandler?: ConnectedHandler
  disconnectedHandler?: DisconnectedHandler
}

const connectedHandlerStub: ConnectedHandler = () => {}
const disconnectedHandlerStub: DisconnectedHandler = () => {}

export class ConnectionHolder {
  ws: WebSocket | null = null
  ok: boolean = false
  work: (() => void) | null = null

  handlers: Array<MessageHandler> = []
  messages: Array<WSMessage> = []

  constructor(args: ConnectionHolderArgs) {
    const connectedHandler: ConnectedHandler = args.connectedHandler ?? connectedHandlerStub
    const disconnectedHandler: DisconnectedHandler = args.disconnectedHandler ?? disconnectedHandlerStub
    const timeout: number = args.timeout ?? 1000
    const port: number = args.port

    this.work = () => {
      // logger.silly('Working...')

      if (!this.ok) {
        logger.debug('Trying to connect...')
        this.ws = new WebSocket(`ws://127.0.0.1:${port}`)

        this.ws.on('open', () => {
          if (this.ws === null) {
            this.ok = false
            return
          }

          logger.debug('Connected.')

          connectedHandler()
          this.ok = true
        })

        this.ws.on('message', (message: WSMessage) => {
          logger.debug('Message arrived...')

          const handler: MessageHandler | undefined = this.handlers.shift();

          if (handler !== undefined) {
            handler(message)
          }
        })

        this.ws.on('error', () => {
          logger.debug('Error happened. Closing connection...')
          this.ok = false

          this.ws?.close()
        })

        this.ws.on('close', () => {
          if (this.ok) {
            logger.debug('Connection closed.')
            disconnectedHandler()
          }

          this.ok = false
        })
      } else {
        // logger.silly('Sending messages from the buffer...')

        while (true) {
          if (this.ws === null) {
            break
          }

          const message: WSMessage | undefined = this.messages.shift()

          if (message === undefined) {
            break
          }

          this.ws.send(message)
        }
      }
    }

    setInterval(() => this.work && this.work(), timeout);
  }

  send(message: WSMessage, handler: MessageHandler) {
    this.handlers.push(handler)
    this.messages.push(message)
  }

  close(): void {
    this.ws?.close()
    this.handlers = []
    this.messages = []

    this.ws = null
  }
}
