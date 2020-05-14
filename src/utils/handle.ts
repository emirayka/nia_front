import IpcMainEvent = Electron.IpcMainEvent
import {ipcMain} from 'electron'
import BrowserWindow = Electron.BrowserWindow

import {
  NiaEvent,
  NiaEventResponse,
  NiaDefineKeyboardResult,
  NiaExecuteCodeResult,
  NiaGetDeviceInfoResult,
  NiaGetDevicesResult,
  NiaRemoveKeyboardByPathResponse,
  NiaRemoveKeyboardByPathResult,
  NiaHandshakeResult,
  NiaExecuteCodeEvent,
  NiaDefineKeyboardEvent,
  NiaRemoveKeyboardEvent,
  NiaDefineModifierEvent,
  NiaRemoveModifierEvent,
  NiaExecuteCodeEventResponse,
  NiaDefineKeyboardEventResponse,
  NiaRemoveKeyboardEventResponse,
  NiaSynchronizeEventResponse,
  NiaSynchronizeEvent,
  NiaEventSerialized,
  NiaDefineModifierEventResponse,
  NiaDefineModifierResult,
  NiaRemoveModifierEventResponse, NiaRemoveModifierResult, NiaGetDefinedModifiersResult,
} from '@/utils'

import {Protocol} from '@/utils/sockets'

const handleSynchronizeEvent = async (
  niaProtocol: Protocol,
  event: NiaSynchronizeEvent,
): Promise<NiaEventResponse> => {
  await niaProtocol.isReady()

  const handshakeResult: NiaHandshakeResult = await niaProtocol.handshake()
  const getDevicesResult: NiaGetDevicesResult = await niaProtocol.getDevices()
  const getDeviceInfoResults: Array<NiaGetDeviceInfoResult> = await niaProtocol.getMultipleDeviceInfo(
    getDevicesResult,
  )
  const getDefinedModifiersResult: NiaGetDefinedModifiersResult = await niaProtocol.getDefinedModifiers()

  const synchronizeEventResponse: NiaSynchronizeEventResponse = NiaSynchronizeEventResponse.from(
    event,
    handshakeResult,
    getDeviceInfoResults,
    getDefinedModifiersResult
  );

  return synchronizeEventResponse.toEventResponse()
}

const handleExecuteCodeEvent = async (
  niaProtocol: Protocol,
  event: NiaExecuteCodeEvent,
): Promise<NiaEventResponse> => {
  await niaProtocol.isReady()

  const executeCodeResult: NiaExecuteCodeResult = await niaProtocol.executeCode(event.getCode())
  const executeCodeEventResponse: NiaExecuteCodeEventResponse = new NiaExecuteCodeEventResponse(
    event,
    executeCodeResult,
  )

  return executeCodeEventResponse.toEventResponse()
}

const handleDefineKeyboardEvent = async (
  niaProtocol: Protocol,
  event: NiaDefineKeyboardEvent,
): Promise<NiaEventResponse> => {
  await niaProtocol.isReady()

  const keyboardPath: string = event.getKeyboardPath()
  const keyboardName: string = event.getKeyboardName()

  const result: NiaDefineKeyboardResult = await niaProtocol.defineKeyboard(keyboardPath, keyboardName)

  const defineKeyboardEventResponse: NiaDefineKeyboardEventResponse = new NiaDefineKeyboardEventResponse(
    event,
    result,
  )

  return defineKeyboardEventResponse.toEventResponse()
}

const handleRemoveKeyboardEvent = async (
  niaProtocol: Protocol,
  event: NiaRemoveKeyboardEvent,
): Promise<NiaEventResponse> => {
  await niaProtocol.isReady()

  const keyboardPath = event.getKeyboardPath()

  const result: NiaRemoveKeyboardByPathResult = await niaProtocol.removeKeyboardByPath(keyboardPath)
  const removeKeyboardEventResponse: NiaRemoveKeyboardEventResponse = new NiaRemoveKeyboardEventResponse(
    event,
    result,
  );

  return removeKeyboardEventResponse.toEventResponse()
}

const handleDefineModifierEvent = async (
  niaProtocol: Protocol,
  event: NiaDefineModifierEvent,
): Promise<NiaEventResponse> => {
  await niaProtocol.isReady()

  const keyboardPath = event.getKeyboardPath()
  const keyCode = event.getKeyCode()
  const modifierAlias = event.getModifierAlias()

  const result: NiaDefineModifierResult = await niaProtocol.defineModifier(
    keyboardPath,
    keyCode,
    modifierAlias,
  )

  const defineModifierEventResponse: NiaDefineModifierEventResponse = new NiaDefineModifierEventResponse(
    event,
    result,
  );

  return defineModifierEventResponse.toEventResponse()
}

const handleRemoveModifierEvent = async (
  niaProtocol: Protocol,
  event: NiaRemoveModifierEvent,
): Promise<NiaEventResponse> => {
  await niaProtocol.isReady()

  const keyboardPath = event.getKeyboardPath()
  const keyCode = event.getKeyCode()

  console.log('Handler: Sent remove modifier event.')

  const result: NiaRemoveModifierResult = await niaProtocol.removeModifier(
    keyboardPath,
    keyCode,
  )

  console.log('Handler: Got remove modifier result.')

  const removeModifierEventResponse: NiaRemoveModifierEventResponse = new NiaRemoveModifierEventResponse(
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
  } else if (event.isDefineKeyboardEvent()) {
    return handleDefineKeyboardEvent(niaProtocol, event.takeDefineKeyboardEvent())
  } else if (event.isRemoveKeyboardEvent()) {
    return handleRemoveKeyboardEvent(niaProtocol, event.takeRemoveKeyboardEvent())
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
