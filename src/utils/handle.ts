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
  NiaExecuteCodeResponse, NiaDefineModifierResponse, NiaRemoveModifierResponse,
} from '@/utils'

import {Protocol} from '@/utils/sockets'
import {NiaDefineDeviceResponse} from '@/utils/protocol/responses/define-device-response'
import {NiaRemoveDeviceByPathResponse} from '@/utils/protocol/responses/remove-device-by-path-response'

const handleSynchronizeEvent = async (
  niaProtocol: Protocol,
  event: NiaSynchronizeEvent,
): Promise<NiaEventResponse> => {
  await niaProtocol.isReady()

  const handshakeResponse: NiaHandshakeResponse = await niaProtocol.handshake()
  const getDevicesResponse: NiaGetDevicesResponse = await niaProtocol.getDevices()
  const getDefinedModifiersResponse: NiaGetDefinedModifiersResponse = await niaProtocol.getDefinedModifiers()

  const synchronizeEventResponse: NiaSynchronizeEventResponse = NiaSynchronizeEventResponse.from(
    event,
    handshakeResponse,
    getDevicesResponse,
    getDefinedModifiersResponse
  );

  return synchronizeEventResponse.toEventResponse()
}

const handleExecuteCodeEvent = async (
  niaProtocol: Protocol,
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
  niaProtocol: Protocol,
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
  niaProtocol: Protocol,
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
  niaProtocol: Protocol,
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
  niaProtocol: Protocol,
  event: NiaRemoveModifierEvent,
): Promise<NiaEventResponse> => {
  await niaProtocol.isReady()

  const deviceId: number = event.getDeviceId()
  const keyCode: number = event.getKeyCode()

  const result: NiaRemoveModifierResponse = await niaProtocol.removeModifier(
    deviceId,
    keyCode,
  )

  console.log('Handler: Got remove modifier result.')

  const removeModifierEventResponse: NiaRemoveModifierEventResponse = NiaRemoveModifierEventResponse.from(
    event,
    result,
  );

  return removeModifierEventResponse.toEventResponse()
}

const handleEvent = async (
  niaProtocol: Protocol,
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
    const event: NiaEvent = NiaEvent.deserialize(serializedEvent)

    if (!event.isSynchronizeEvent()) {
      throw new Error('Expected synchronize event at first.')
    }

    const niaProtocol: Protocol = new Protocol(12112)
    await niaProtocol.isReady()

    const eventResponse: NiaEventResponse = await handleSynchronizeEvent(
      niaProtocol,
      event.takeSynchronizeEvent(),
    )
    const eventResponseSerialized = eventResponse.serialize()
    win.webContents.send('nia-server-event-response', eventResponseSerialized)

    return async (_: IpcMainEvent, serializedEvent: NiaEventSerialized) => {
      try {
        const event: NiaEvent = NiaEvent.deserialize(serializedEvent)
        const eventResponse = await handleEvent(niaProtocol, event)
        console.log('Got event response: ', eventResponse)

        const eventResponseSerialized = eventResponse.serialize()
        win.webContents.send('nia-server-event-response', eventResponseSerialized)
      } catch (e) {
        console.log('Error:')
        console.log(e)
      }
    }
  } catch (e) {
    console.log('Error:')
    console.log(e)
    throw e
  }
}
