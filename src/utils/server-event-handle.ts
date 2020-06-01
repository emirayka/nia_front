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
  NiaExecuteCodeResponse,
  NiaDefineModifierResponse,
  NiaRemoveModifierResponse,
  NiaKey,
  NiaGetDefinedMappingsResponse,
  NiaDefineMappingEventResponse,
  NiaDefineMappingEvent,
  NiaDefineMappingResponse,
  NiaRemoveMappingEvent, NiaRemoveMappingResponse, NiaRemoveMappingEventResponse, NiaEventResponseSerialized,
} from '@/utils'

import {NiaProtocol} from '@/utils'
import {NiaDefineDeviceResponse} from '@/utils'
import {NiaRemoveDeviceByPathResponse} from '@/utils'
import {NiaGetDefinedActionsResponse} from '@/utils'

import loggers from '@/utils/logger'
import {NiaDefineActionEvent} from '@/utils'
import {NiaRemoveActionEvent} from '@/utils'
import {NiaRemoveActionEventResponse} from '@/utils'
import {NiaRemoveActionResponse} from '@/utils'
import {NiaDefineActionResponse} from '@/utils'
import {NiaDefineActionEventResponse} from '@/utils'
import {NiaChangeMappingEvent} from '@/utils/event/events/change-mapping-event'
import {NiaChangeMappingResponse} from '@/utils/protocol/responses/change-mapping-response'
import {NiaChangeMappingEventResponse} from '@/utils/event/responses/change-mapping-event-response'
import {NiaStartListeningEventResponse} from '@/utils/event/responses/start-listening-event-response'
import {NiaStartListeningResponse} from '@/utils/protocol/responses/start-listening-response'
import {NiaStartListeningEvent} from '@/utils/event/events/start-listening-event'
import {NiaStopListeningEventResponse} from '@/utils/event/responses/stop-listening-event-response'
import {NiaStopListeningResponse} from '@/utils/protocol/responses/stop-listening-response'
import {NiaStopListeningEvent} from '@/utils/event/events/stop-listening-event'
import {NiaIsListeningResponse} from '@/utils/protocol/responses/is-listening-response'
import {ConnectionHolder} from '@/utils/sockets/connection-holder'
import {NiaConnectedEventResponse} from '@/utils/event/responses/connected-event-response'
import {NiaDisconnectedEventResponse} from '@/utils/event/responses/disconnected-event-response'
import {NiaExecuteTerminalCodeEvent} from '@/utils/event/events/execute-terminal-code-event'
import {NiaExecuteTerminalCodeEventResponse} from '@/utils/event/responses/execute-terminal-code-event-response'

const logger  = loggers('handle')

const handleSynchronizeEvent = async (
  niaProtocol: NiaProtocol,
  // event: NiaSynchronizeEvent,
): Promise<NiaEventResponse> => {
  logger.debug('Handling synchronize event...')

  logger.debug(`Sending 'Handshake' request...`)
  const handshakeResponse: NiaHandshakeResponse = await niaProtocol.handshake()
  logger.debug(`Got 'Handshake' response:`)
  logger.debug(handshakeResponse)

  logger.debug(`Sending 'IsListening' request...`)
  const isListeningResponse: NiaIsListeningResponse = await niaProtocol.isListening()
  logger.debug(`Got 'IsListening' response:`)
  logger.debug(isListeningResponse)

  logger.debug(`Sending 'Get Devices' request...`)
  const getDevicesResponse: NiaGetDevicesResponse = await niaProtocol.getDevices()
  logger.debug(`Got 'Get Devices' response:`)
  logger.debug(getDevicesResponse)

  logger.debug(`Sending 'Get Defined Modifiers' request...`)
  const getDefinedModifiersResponse: NiaGetDefinedModifiersResponse = await niaProtocol.getDefinedModifiers()
  logger.debug(`Got 'Get Defined Modifiers' response: ${getDevicesResponse}.`)
  logger.debug(getDefinedModifiersResponse)

  logger.debug(`Sending 'Get Defined Actions' request...`)
  const getDefinedActionsResponse: NiaGetDefinedActionsResponse = await niaProtocol.getDefinedActions()
  logger.debug(`Got 'Get Defined Actions' response:`)
  logger.debug(getDefinedActionsResponse)

  logger.debug(`Sending 'Get Defined Mappings' request...`)
  const getDefinedMappingsResponse: NiaGetDefinedMappingsResponse = await niaProtocol.getDefinedMappings()
  logger.debug(`Got 'Get Defined Mappings' response:`)
  logger.debug(getDefinedMappingsResponse)

  logger.silly('"Все объекты класса Кетер,')
  logger.silly('Подросли на целый метр."')
  logger.silly('"И какой сейчас длины?"')
  logger.silly('"[ДАННЫЕ УДАЛЕНЫ]"')

  logger.debug(`Constructing synchronize event response.`)
  const synchronizeEventResponse: NiaSynchronizeEventResponse = NiaSynchronizeEventResponse.from(
    // event,
    handshakeResponse,
    isListeningResponse,
    getDevicesResponse,
    getDefinedModifiersResponse,
    getDefinedActionsResponse,
    getDefinedMappingsResponse
  );

  logger.debug(`Sending 'Synchronize' event response.`)

  return synchronizeEventResponse.toEventResponse()
}

const handleExecuteCodeEvent = async (
  niaProtocol: NiaProtocol,
  event: NiaExecuteCodeEvent,
): Promise<NiaEventResponse> => {
  const executeCodeResponse: NiaExecuteCodeResponse = await niaProtocol.executeCode(event.getCode())
  const executeCodeEventResponse: NiaExecuteCodeEventResponse = NiaExecuteCodeEventResponse.from(
    event,
    executeCodeResponse,
  )

  return executeCodeEventResponse.toEventResponse()
}

const handleExecuteTerminalCodeEvent = async (
  niaProtocol: NiaProtocol,
  event: NiaExecuteTerminalCodeEvent,
): Promise<NiaEventResponse> => {
  const executeTerminalCodeResponse: NiaExecuteCodeResponse = await niaProtocol.executeCode(event.getCode())
  const executeTerminalCodeEventResponse: NiaExecuteTerminalCodeEventResponse = NiaExecuteTerminalCodeEventResponse.from(
    event,
    executeTerminalCodeResponse,
  )

  return executeTerminalCodeEventResponse.toEventResponse()
}

const handleDefineDeviceEvent = async (
  niaProtocol: NiaProtocol,
  event: NiaDefineDeviceEvent,
): Promise<NiaEventResponse> => {
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
  const devicePath = event.getDevicePath()

  const response: NiaRemoveDeviceByPathResponse = await niaProtocol.removeDeviceByPath(devicePath)
  const removeDeviceEventResponse: NiaRemoveDeviceEventResponse = NiaRemoveDeviceEventResponse.from(
    event,
    response,
  );

  return removeDeviceEventResponse.toEventResponse()
}

const handleDefineModifierEvent = async (
  niaProtocol: NiaProtocol,
  event: NiaDefineModifierEvent,
): Promise<NiaEventResponse> => {
  const response: NiaDefineModifierResponse = await niaProtocol.defineModifier(
    event.getModifier()
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
  const deviceId: number | null = event.getDeviceId()
  const keyCode: number = event.getKeyCode()
  const key: NiaKey = new NiaKey({
    keyCode,
    deviceId
  })

  logger.debug('Sending remove modifier request...')
  const response: NiaRemoveModifierResponse = await niaProtocol.removeModifier(key)
  logger.debug('Got response:')
  logger.debug(response)

  const removeModifierEventResponse: NiaRemoveModifierEventResponse = NiaRemoveModifierEventResponse.from(
    event,
    response,
  );

  return removeModifierEventResponse.toEventResponse()
}

const handleDefineActionEvent = async (
  niaProtocol: NiaProtocol,
  event: NiaDefineActionEvent,
): Promise<NiaEventResponse> => {
  logger.debug('Sending define action request...')
  const response: NiaDefineActionResponse = await niaProtocol.defineAction(event.getNamedAction())
  logger.debug('Got response:')
  logger.debug(response)

  const defineActionEventResponse: NiaDefineActionEventResponse = NiaDefineActionEventResponse.from(
    event,
    response,
  );

  return defineActionEventResponse.toEventResponse()
}

const handleRemoveActionEvent = async (
  niaProtocol: NiaProtocol,
  event: NiaRemoveActionEvent,
): Promise<NiaEventResponse> => {
  logger.debug('Sent "Remove Action" request.')
  const removeActionResponse: NiaRemoveActionResponse = await niaProtocol.removeAction(event.getActionName())
  logger.debug('Got response:')
  logger.debug(removeActionResponse)

  const removeActionEventResponse: NiaRemoveActionEventResponse = NiaRemoveActionEventResponse.from(
    event,
    removeActionResponse,
  );

  logger.debug('Constructed event response:')
  logger.debug(removeActionEventResponse)

  return removeActionEventResponse.toEventResponse()
}

const handleDefineMappingEvent = async (
  niaProtocol: NiaProtocol,
  event: NiaDefineMappingEvent,
): Promise<NiaEventResponse> => {
  logger.debug('Sent "Define Mapping" request.')
  const removeMappingResponse: NiaDefineMappingResponse = await niaProtocol.defineMapping(event.getMapping())
  logger.debug('Got response:')
  logger.debug(removeMappingResponse)

  const removeMappingEventResponse: NiaDefineMappingEventResponse = NiaDefineMappingEventResponse.from(
    event,
    removeMappingResponse,
  );

  logger.debug('Constructed event response:')
  logger.debug(removeMappingEventResponse)

  return removeMappingEventResponse.toEventResponse()
}

const handleChangeMappingEvent = async (
  niaProtocol: NiaProtocol,
  event: NiaChangeMappingEvent,
): Promise<NiaEventResponse> => {
  logger.debug('Sent "Change Mapping" request.')
  const removeMappingResponse: NiaChangeMappingResponse = await niaProtocol.changeMapping(
    event.getKeyChords(),
    event.getAction()
  )
  logger.debug('Got response:')
  logger.debug(removeMappingResponse)

  const removeMappingEventResponse: NiaChangeMappingEventResponse = NiaChangeMappingEventResponse.from(
    event,
    removeMappingResponse,
  );

  logger.debug('Constructed event response:')
  logger.debug(removeMappingEventResponse)

  return removeMappingEventResponse.toEventResponse()
}

const handleRemoveMappingEvent = async (
  niaProtocol: NiaProtocol,
  event: NiaRemoveMappingEvent,
): Promise<NiaEventResponse> => {
  logger.debug('Sent "Remove Mapping" request.')
  const removeMappingResponse: NiaRemoveMappingResponse = await niaProtocol.removeMapping(
    event.getKeyChords(),
  )
  logger.debug('Got response:')
  logger.debug(removeMappingResponse)

  const removeMappingEventResponse: NiaRemoveMappingEventResponse = NiaRemoveMappingEventResponse.from(
    event,
    removeMappingResponse,
  );

  logger.debug('Constructed event response:')
  logger.debug(removeMappingEventResponse)

  return removeMappingEventResponse.toEventResponse()
}

const handleStartListeningEvent = async (
  niaProtocol: NiaProtocol,
  event: NiaStartListeningEvent,
): Promise<NiaEventResponse> => {
  logger.debug('Sent "StartListening" request.')
  const startListeningResponse: NiaStartListeningResponse = await niaProtocol.startListening(
  )
  logger.debug('Got response:')
  logger.debug(startListeningResponse)

  const startListeningEventResponse: NiaStartListeningEventResponse = NiaStartListeningEventResponse.from(
    event,
    startListeningResponse,
  );

  logger.debug('Constructed event response:')
  logger.debug(startListeningEventResponse)

  return startListeningEventResponse.toEventResponse()
}

const handleStopListeningEvent = async (
  niaProtocol: NiaProtocol,
  event: NiaStopListeningEvent,
): Promise<NiaEventResponse> => {
  logger.debug('Sent "StopListening" request.')
  const stopListeningResponse: NiaStopListeningResponse = await niaProtocol.stopListening(
  )
  logger.debug('Got response:')
  logger.debug(stopListeningResponse)

  const stopListeningEventResponse: NiaStopListeningEventResponse = NiaStopListeningEventResponse.from(
    event,
    stopListeningResponse,
  );

  logger.debug('Constructed event response:')
  logger.debug(stopListeningEventResponse)

  return stopListeningEventResponse.toEventResponse()
}

const handleEvent = async (
  niaProtocol: NiaProtocol,
  event: NiaEvent,
): Promise<NiaEventResponse> => {
  console.log('Got event: ', event)

  if (event.isSynchronizeEvent()) {
    return handleSynchronizeEvent(niaProtocol)
  } else if (event.isExecuteCodeEvent()) {
    return handleExecuteCodeEvent(niaProtocol, event.takeExecuteCodeEvent())
  } else if (event.isExecuteTerminalCodeEvent()) {
    return handleExecuteTerminalCodeEvent(niaProtocol, event.takeExecuteTerminalCodeEvent())
  } else if (event.isDefineDeviceEvent()) {
    return handleDefineDeviceEvent(niaProtocol, event.takeDefineDeviceEvent())
  } else if (event.isRemoveDeviceEvent()) {
    return handleRemoveDeviceEvent(niaProtocol, event.takeRemoveDeviceEvent())
  } else if (event.isDefineModifierEvent()) {
    return handleDefineModifierEvent(niaProtocol, event.takeDefineModifierEvent())
  } else if (event.isRemoveModifierEvent()) {
    return handleRemoveModifierEvent(niaProtocol, event.takeRemoveModifierEvent())
  } else if (event.isDefineActionEvent()) {
    return handleDefineActionEvent(niaProtocol, event.takeDefineActionEvent())
  } else if (event.isRemoveActionEvent()) {
    return handleRemoveActionEvent(niaProtocol, event.takeRemoveActionEvent())
  } else if (event.isDefineMappingEvent()) {
    return handleDefineMappingEvent(niaProtocol, event.takeDefineMappingEvent())
  } else if (event.isChangeMappingEvent()) {
    return handleChangeMappingEvent(niaProtocol, event.takeChangeMappingEvent())
  } else if (event.isRemoveMappingEvent()) {
    return handleRemoveMappingEvent(niaProtocol, event.takeRemoveMappingEvent())
  } else if (event.isStartListeningEvent()) {
    return handleStartListeningEvent(niaProtocol, event.takeStartListeningEvent())
  } else if (event.isStopListeningEvent()) {
    return handleStopListeningEvent(niaProtocol, event.takeStopListeningEvent())
  } else {
    throw new Error('Unknown event was passed')
  }
}

export type NiaHandler = (_: IpcMainEvent, serializedEvent: NiaEventSerialized) => void

export class NiaServerEventHandler {
  private readonly connectionHolder: ConnectionHolder
  private readonly protocol: NiaProtocol
  private readonly win: BrowserWindow
  private readonly handler: NiaHandler

  constructor(
    win: BrowserWindow,
  ) {
    this.win = win

    logger.debug('Making connection holder...')
    this.connectionHolder = new ConnectionHolder({
      port: 12112,
      timeout: 100,
      connectedHandler: () => {
        logger.debug('Executing connected handler')

        const connectedEventResponse: NiaConnectedEventResponse = new NiaConnectedEventResponse({})
        const eventResponse: NiaEventResponse = connectedEventResponse.toEventResponse()
        const eventResponseSerialized: NiaEventResponseSerialized = eventResponse.serialize()

        win.webContents.send('nia-server-event-response', eventResponseSerialized)
      },
      disconnectedHandler: () => {
        logger.debug('Executing disconnected handler')

        const disconnectedEventResponse: NiaDisconnectedEventResponse = new NiaDisconnectedEventResponse({})
        const eventResponse: NiaEventResponse = disconnectedEventResponse.toEventResponse()
        const eventResponseSerialized: NiaEventResponseSerialized = eventResponse.serialize()

        win.webContents.send('nia-server-event-response', eventResponseSerialized)
      },
    })

    logger.debug('Making message handler...')
    this.protocol = new NiaProtocol(this.connectionHolder)
    logger.debug('Done.')

    this.handler = async (_: IpcMainEvent, serializedEvent: NiaEventSerialized) => {
      try {
        const event: NiaEvent = NiaEvent.deserialize(serializedEvent)
        logger.debug(`Got an event:`)
        logger.debug(event)

        const eventResponse = await handleEvent(this.protocol, event)
        logger.debug(`Made event response:`)
        logger.debug(eventResponse)

        const eventResponseSerialized = eventResponse.serialize()
        win.webContents.send('nia-server-event-response', eventResponseSerialized)

        logger.debug('Sent response to the renderer process.')
      } catch (e) {
        logger.error(`Error during handling event: ${e}.`)
      }
    }

    ipcMain.on('nia-server-event', this.handler)
  }

  restart(): void {
    this.connectionHolder.close()
  }
}
