import {ipcMain} from 'electron'

import BrowserWindow = Electron.BrowserWindow

import NiaEvent from '@/utils/event/events/event'
import NiaEventResponse from '@/utils/event/responses/response'
import {Protocol} from '@/utils/sockets'
import NiaHandshakeResult from '@/utils/protocol/result/handshake-result'
import {
  NiaDefineKeyboardResult,
  NiaExecuteCodeResult,
  NiaGetDeviceInfoResult,
  NiaGetDevicesResult, NiaRemoveKeyboardByPathResponse, NiaRemoveKeyboardByPathResult,
} from '@/utils/protocol'
import NiaSynchronizeEvent from '@/utils/event/events/synchronize-event'
import IpcMainEvent = Electron.IpcMainEvent
import NiaExecuteCodeEvent from '@/utils/event/events/execute-code-event'
import NiaDefineKeyboardEvent from '@/utils/event/events/define-keyboard-event'
import NiaRemoveKeyboardEvent from '@/utils/event/events/remove-keyboard-event'
import NiaDefineModifierEvent from '@/utils/event/events/define-modifier-event'
import NiaRemoveModifierEvent from '@/utils/event/events/remove-modifier-event'
import NiaExecuteCodeEventResponse from '@/utils/event/responses/execute-code-event-response'
import NiaDefineKeyboardEventResponse from '@/utils/event/responses/define-keyboard-event-response'
import NiaRemoveKeyboardEventResponse from '@/utils/event/responses/remove-keyboard-event-response'
import NiaSynchronizeEventResponse from '@/utils/event/responses/synchronize-event-response'

const handleSynchronizeEvent = async (
  niaProtocol: Protocol,
  event: NiaSynchronizeEvent,
): Promise<NiaEventResponse> => {
  await niaProtocol.isReady()

  const handshakeResult: NiaHandshakeResult = await niaProtocol.handshake()
  const getDevicesResult: NiaGetDevicesResult = await niaProtocol.getDevices()
  const getDeviceInfoResults: Array<NiaGetDeviceInfoResult> = await niaProtocol.getMultipleDeviceInfo(
    getDevicesResult
  )

  const synchronizeEventResponse: NiaSynchronizeEventResponse = new NiaSynchronizeEventResponse(
    event,
    handshakeResult,
    getDeviceInfoResults
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
    result
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
    result
  );

  return removeKeyboardEventResponse.toEventResponse()
}

// const handleDefineModifierEvent = async (
//   niaProtocol: Protocol,
//   event: NiaDefineModifierEvent,
// ): Promise<NiaEventResponse> => {
// }
//
// const handleRemoveModifierEvent = async (
//   niaProtocol: Protocol,
//   event: NiaRemoveModifierEvent,
// ): Promise<NiaEventResponse> => {
// }

const handleEvent = async (
  niaProtocol: Protocol,
  event: NiaEvent,
): Promise<NiaEventResponse> => {
  if (event.isSynchronizeEvent()) {
    return handleSynchronizeEvent(niaProtocol, event.takeSynchronizeEvent())
  } else if (event.isExecuteCodeEvent()) {
    return handleExecuteCodeEvent(niaProtocol, event.takeExecuteCodeEvent())
  } else if (event.isDefineKeyboardEvent()) {
    return handleDefineKeyboardEvent(niaProtocol, event.takeDefineKeyboardEvent())
  } else if (event.isRemoveKeyboardEvent()) {
    return handleRemoveKeyboardEvent(niaProtocol, event.takeRemoveKeyboardEvent())
  // } else if (event.isDefineModifierEvent()) {
  //   return handleDefineModifierEvent(niaProtocol, event.takeDefineModifierEvent())
  // } else if (event.isRemoveModifierEvent()) {
  //   return handleRemoveModifierEvent(niaProtocol, event.takeRemoveModifierEvent())
  } else {
    throw new Error('Unknown event was passed')
  }
}

export type NiaHandler = (_: IpcMainEvent, event: NiaEvent) => void

export const startHandler = async (
  win: BrowserWindow,
  event: NiaEvent,
): Promise<NiaHandler> => {
  if (!event.isSynchronizeEvent()) {
    throw new Error('Expected synchronize event at first.')
  }

  const niaProtocol: Protocol = new Protocol(12112)
  await niaProtocol.isReady()

  const eventResponse: NiaEventResponse = await handleSynchronizeEvent(
    niaProtocol,
    event.takeSynchronizeEvent()
  )
  win.webContents.send('nia-server-event-response', eventResponse)

  return async (_: IpcMainEvent, event: NiaEvent) => {
    const response = await handleEvent(niaProtocol, event)

    win.webContents.send('nia-server-event-response', response)
  }
}
