import IpcMainEvent = Electron.IpcMainEvent
import {ipcMain} from 'electron'
import BrowserWindow = Electron.BrowserWindow

import {
  NiaEvent,
  NiaEventResponse,
  NiaExecuteCodeEvent,
  NiaDefineDeviceEvent,
  NiaRemoveDeviceEvent,
  NiaDefineModifierEvent,
  NiaRemoveModifierEvent,
  NiaExecuteCodeEventResponse,
  NiaDefineDeviceEventResponse,
  NiaRemoveDeviceEventResponse,
  NiaSynchronizeEventResponse,
  NiaSynchronizeEvent,
  NiaEventSerialized,
  NiaDefineModifierEventResponse,
  NiaRemoveModifierEventResponse,
  NiaHandshakeResponse,
  NiaGetDevicesResponse,
  NiaGetDefinedModifiersResponse,
  NiaExecuteCodeResponse, NiaDefineModifierResponse, NiaRemoveModifierResponse, NiaKey,
} from '@/utils'

import {NiaProtocol} from '@/utils'
import {NiaDefineDeviceResponse} from '@/utils/protocol/responses/define-device-response'
import {NiaRemoveDeviceByPathResponse} from '@/utils/protocol/responses/remove-device-by-path-response'
import {NiaGetDefinedActionsResponse} from '@/utils/protocol/responses/get-defined-actions-request'

import loggers from '@/utils/logger'
const logger  = loggers('handle')

const handleSynchronizeEvent = async (
  niaProtocol: NiaProtocol,
  event: NiaSynchronizeEvent,
): Promise<NiaEventResponse> => {
  await niaProtocol.isReady()
  logger.info('Handling synchronize event...')

  logger.info(`Sending 'Handshake' request...`)
  const handshakeResponse: NiaHandshakeResponse = await niaProtocol.handshake()
  logger.info(`Got 'Handshake' response:`)
  logger.debug(handshakeResponse)

  logger.info(`Sending 'Get Devices' request...`)
  const getDevicesResponse: NiaGetDevicesResponse = await niaProtocol.getDevices()
  logger.info(`Got 'Get Devices' response:`)
  logger.debug(getDevicesResponse)

  logger.info(`Sending 'Get Defined Modifiers' request...`)
  const getDefinedModifiersResponse: NiaGetDefinedModifiersResponse = await niaProtocol.getDefinedModifiers()
  logger.info(`Got 'Get Defined Modifiers' response: ${getDevicesResponse}.`)
  logger.debug(getDefinedModifiersResponse)

  logger.info(`Sending 'Get Defined Actions' request...`)
  const getDefinedActionsResponse: NiaGetDefinedActionsResponse = await niaProtocol.getDefinedActions()
  logger.info(`Got 'Get Defined Actions' response:`)
  logger.debug(getDefinedActionsResponse)

  logger.silly('"Все объекты класса Кетер,')
  logger.silly('Подросли на целый метр."')
  logger.silly('"И какой сейчас длины?"')
  logger.silly('"[ДАННЫЕ УДАЛЕНЫ]"')

  logger.info(`Constructing synchronize event response.`)
  const synchronizeEventResponse: NiaSynchronizeEventResponse = NiaSynchronizeEventResponse.from(
    event,
    handshakeResponse,
    getDevicesResponse,
    getDefinedModifiersResponse,
    getDefinedActionsResponse
  );

  logger.info(`Sending 'Synchronize' event response.`)

  return synchronizeEventResponse.toEventResponse()
}

const handleExecuteCodeEvent = async (
  niaProtocol: NiaProtocol,
  event: NiaExecuteCodeEvent,
): Promise<NiaEventResponse> => {
  await niaProtocol.isReady()

  const executeCodeResponse: NiaExecuteCodeResponse = await niaProtocol.executeCode(event.getCode())
  const executeCodeEventResponse: NiaExecuteCodeEventResponse = NiaExecuteCodeEventResponse.from(
    event,
    executeCodeResponse,
  )

  return executeCodeEventResponse.toEventResponse()
}

const handleDefineDeviceEvent = async (
  niaProtocol: NiaProtocol,
  event: NiaDefineDeviceEvent,
): Promise<NiaEventResponse> => {
  await niaProtocol.isReady()

  const deviceId: number = event.getDeviceId()

  const response: NiaDefineDeviceResponse = await niaProtocol.defineDevice(deviceId)

  const defineDeviceEventResponse: NiaDefineDeviceEventResponse = NiaDefineDeviceEventResponse.from(
    event,
    response,
  )

  return defineDeviceEventResponse.toEventResponse()
}

const handleRemoveDeviceEvent = async (
  niaProtocol: NiaProtocol,
  event: NiaRemoveDeviceEvent,
): Promise<NiaEventResponse> => {
  await niaProtocol.isReady()

  const keyboardPath = event.getDevicePath()

  const result: NiaRemoveDeviceByPathResponse = await niaProtocol.removeDeviceByPath(keyboardPath)
  const removeDeviceEventResponse: NiaRemoveDeviceEventResponse = NiaRemoveDeviceEventResponse.from(
    event,
    result,
  );

  return removeDeviceEventResponse.toEventResponse()
}

const handleDefineModifierEvent = async (
  niaProtocol: NiaProtocol,
  event: NiaDefineModifierEvent,
): Promise<NiaEventResponse> => {
  await niaProtocol.isReady()

  const deviceId: number = event.getDeviceId()
  const keyCode: number = event.getKeyCode()
  const modifierAlias: string = event.getModifierAlias()

  const response: NiaDefineModifierResponse = await niaProtocol.defineModifier(
    deviceId,
    keyCode,
    modifierAlias,
  )

  const defineModifierEventResponse: NiaDefineModifierEventResponse = NiaDefineModifierEventResponse.from(
    event,
    response,
  );

  return defineModifierEventResponse.toEventResponse()
}

const handleRemoveModifierEvent = async (
  niaProtocol: NiaProtocol,
  event: NiaRemoveModifierEvent,
): Promise<NiaEventResponse> => {
  await niaProtocol.isReady()

  const deviceId: number | null = event.getDeviceId()
  const keyCode: number = event.getKeyCode()
  const key: NiaKey = new NiaKey({
    keyCode,
    deviceId
  })

  const result: NiaRemoveModifierResponse = await niaProtocol.removeModifier(key)

  console.log('Handler: Got remove modifier result.')

  const removeModifierEventResponse: NiaRemoveModifierEventResponse = NiaRemoveModifierEventResponse.from(
    event,
    result,
  );

  return removeModifierEventResponse.toEventResponse()
}


const handleEvent = async (
  niaProtocol: NiaProtocol,
  event: NiaEvent,
): Promise<NiaEventResponse> => {
  console.log('Got event: ', event)

  if (event.isSynchronizeEvent()) {
    return handleSynchronizeEvent(niaProtocol, event.takeSynchronizeEvent())
  } else if (event.isExecuteCodeEvent()) {
    return handleExecuteCodeEvent(niaProtocol, event.takeExecuteCodeEvent())
  } else if (event.isDefineDeviceEvent()) {
    return handleDefineDeviceEvent(niaProtocol, event.takeDefineDeviceEvent())
  } else if (event.isRemoveDeviceEvent()) {
    return handleRemoveDeviceEvent(niaProtocol, event.takeRemoveDeviceEvent())
  } else if (event.isDefineModifierEvent()) {
    return handleDefineModifierEvent(niaProtocol, event.takeDefineModifierEvent())
  } else if (event.isRemoveModifierEvent()) {
    return handleRemoveModifierEvent(niaProtocol, event.takeRemoveModifierEvent())
  } else {
    throw new Error('Unknown event was passed')
  }
}

export type NiaHandler = (_: IpcMainEvent, serializedEvent: NiaEventSerialized) => void

export const startHandler = async (
  win: BrowserWindow,
  serializedEvent: NiaEventSerialized,
): Promise<NiaHandler> => {
  try {
    logger.info('Starting handler...')

    const event: NiaEvent = NiaEvent.deserialize(serializedEvent)
    logger.info('Got first event response. Checking type...')

    if (!event.isSynchronizeEvent()) {
      logger.error('The first event response is not synchronize.')
      throw new Error('Expected synchronize event at first.')
    }

    logger.info('Connecting to server...')
    const niaProtocol: NiaProtocol = new NiaProtocol(12112)
    logger.info('Connected..')

    await niaProtocol.isReady()
    logger.info('Communication is initialized.')

    const eventResponse: NiaEventResponse = await handleSynchronizeEvent(
      niaProtocol,
      event.takeSynchronizeEvent(),
    )
    const eventResponseSerialized = eventResponse.serialize()
    win.webContents.send('nia-server-event-response', eventResponseSerialized)

    logger.info('Synchronized ')

    return async (_: IpcMainEvent, serializedEvent: NiaEventSerialized) => {
      try {
        const event: NiaEvent = NiaEvent.deserialize(serializedEvent)
        logger.info(`Got an event: ${event}.`)

        const eventResponse = await handleEvent(niaProtocol, event)
        logger.info(`Made event response: ${eventResponse}.`)

        const eventResponseSerialized = eventResponse.serialize()
        win.webContents.send('nia-server-event-response', eventResponseSerialized)

        logger.info('Sent response to the renderer process.')
      } catch (e) {
        logger.error(`Error during handling event: ${e}.`)
      }
    }
  } catch (e) {
    logger.error(`Error during handling the first synchronize event: ${e}.`)
    throw e
  }
}
