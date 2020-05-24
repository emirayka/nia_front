import Vue from 'vue'
import {defineModule} from 'direct-vuex'

const {
  ipcRenderer,
} = window.require("electron");

import {moduleActionContext, moduleGetterContext, rootActionContext} from '@/store'

import {
  NiaAction,
  NiaDefineDeviceEvent,
  NiaDefineDeviceEventObject,
  NiaDefineDeviceEventResponse,
  NiaDefineMappingEvent,
  NiaDefineMappingEventObject,
  NiaDefineMappingEventResponse,
  NiaDefineModifierEvent,
  NiaDefineModifierEventObject,
  NiaDefineModifierEventResponse,
  NiaDeviceInfo,
  NiaEvent,
  NiaEventResponse,
  NiaEventResponseSerialized,
  NiaExecuteCodeEvent,
  NiaExecuteCodeEventObject,
  NiaExecuteCodeEventResponse,
  NiaKey,
  NiaMapping,
  NiaModifierDescription, NiaNamedAction,
  NiaRemoveDeviceEvent,
  NiaRemoveDeviceEventObject,
  NiaRemoveDeviceEventResponse, NiaRemoveMappingEvent, NiaRemoveMappingEventObject, NiaRemoveMappingEventResponse,
  NiaRemoveModifierEvent,
  NiaRemoveModifierEventObject,
  NiaRemoveModifierEventResponse,
  NiaSynchronizeEvent,
  NiaSynchronizeEventResponse,
} from '@/utils'
import {NiaRemoveActionEvent, NiaRemoveActionEventObject} from '@/utils'
import {NiaDefineActionEvent, NiaDefineActionEventObject} from '@/utils'
import {NiaRemoveActionEventResponse} from '@/utils'
import {NiaDefineActionEventResponse} from '@/utils'

import {ExecutionResult} from '@/store/models'
import {NiaChangeMappingEventResponse} from '@/utils/event/responses/change-mapping-event-response'
import {NiaChangeMappingEvent, NiaChangeMappingEventObject} from '@/utils/event/events/change-mapping-event'
import {NiaStopListeningEventResponse} from '@/utils/event/responses/stop-listening-event-response'
import {NiaStartListeningEventResponse} from '@/utils/event/responses/start-listening-event-response'
import {NiaStopListeningEvent} from '@/utils/event/events/stop-listening-event'
import {NiaStartListeningEvent} from '@/utils/event/events/start-listening-event'

import loggers from '@/utils/logger'
const logger = loggers('store/Connection')

type IPCListener = (_: any, eventResponse: NiaEventResponseSerialized) => void;

export interface ConnectionModuleState {
  ipcListener: IPCListener | null,
}

const ConnectionModule = defineModule({
  namespaced: true,
  state: {
    ipcListener: null,
  } as ConnectionModuleState,
  getters: {
    isConnected: (state: ConnectionModuleState): boolean => {
      return state.ipcListener !== null
    },
    ipcListener: (state: ConnectionModuleState): IPCListener | null => {
      return state.ipcListener
    },
  },
  mutations: {
    setIPCListener(state: ConnectionModuleState, listener: IPCListener | null): void {
      state.ipcListener = listener
    },
  },
  actions: {
    // connectors
    connect(context, payload: undefined): void {
      const { commit, dispatch, getters } = ConnectionModuleActionContext(context)

      if (getters.isConnected) {
        return
      }

      const listener = (_: any, eventResponseSerialized: NiaEventResponseSerialized) => {
        const eventResponse: NiaEventResponse = NiaEventResponse.deserialize(eventResponseSerialized)

        dispatch.handleEventResponse(eventResponse)
      }

      commit.setIPCListener(listener)

      ipcRenderer.on('nia-server-event-response', listener)

      const synchronizeEvent: NiaSynchronizeEvent = new NiaSynchronizeEvent({})
      const event: NiaEvent = synchronizeEvent.toEvent()

      ipcRenderer.send('nia-server-event', event.serialize())
    },

    disconnect(context, payload: undefined): void {
      const { commit, getters } = ConnectionModuleActionContext(context)

      if (!getters.isConnected) {
        return
      }

      ipcRenderer.removeListener('nia-server-event-response', getters.ipcListener)

      commit.setIPCListener(null)
    },

    // event senders
    sendEvent(context, event: NiaEvent): void {
      ipcRenderer.send('nia-server-event', event.serialize())
    },
    executeCode(context, args: NiaExecuteCodeEventObject): void {
      const { dispatch } = ConnectionModuleActionContext(context)

      const executeCodeEvent: NiaExecuteCodeEvent = new NiaExecuteCodeEvent(args)
      const event: NiaEvent = executeCodeEvent.toEvent()

      dispatch.sendEvent(event)
    },

    defineDevice(context, args: NiaDefineDeviceEventObject): void {
      const { dispatch } = ConnectionModuleActionContext(context)

      const defineDeviceEvent: NiaDefineDeviceEvent = new NiaDefineDeviceEvent(args)
      const event: NiaEvent = defineDeviceEvent.toEvent()

      dispatch.sendEvent(event)
    },

    removeDevice(context, args: NiaRemoveDeviceEventObject): void {
      const { dispatch } = ConnectionModuleActionContext(context)

      const removeDeviceEvent: NiaRemoveDeviceEvent = new NiaRemoveDeviceEvent(args)
      const event: NiaEvent = removeDeviceEvent.toEvent()

      dispatch.sendEvent(event)
    },

    defineModifier(context, args: NiaDefineModifierEventObject): void {
      const { dispatch } = ConnectionModuleActionContext(context)

      const defineModifierEvent: NiaDefineModifierEvent = new NiaDefineModifierEvent(args)
      const event: NiaEvent = defineModifierEvent.toEvent()

      dispatch.sendEvent(event)
    },

    removeModifier(context, args: NiaRemoveModifierEventObject): void {
      const { dispatch } = ConnectionModuleActionContext(context)

      const removeModifierEvent = new NiaRemoveModifierEvent(args)
      const event: NiaEvent = removeModifierEvent.toEvent()

      dispatch.sendEvent(event)
    },

    defineAction(context, args: NiaDefineActionEventObject): void {
      const { dispatch } = ConnectionModuleActionContext(context)

      const defineActionEvent = new NiaDefineActionEvent(args)
      const event: NiaEvent = defineActionEvent.toEvent()

      dispatch.sendEvent(event)
    },

    removeAction(context, args: NiaRemoveActionEventObject): void {
      const { dispatch } = ConnectionModuleActionContext(context)

      const removeActionEvent = new NiaRemoveActionEvent(args)
      const event: NiaEvent = removeActionEvent.toEvent()

      dispatch.sendEvent(event)
    },

    defineMapping(context, args: NiaDefineMappingEventObject): void {
      const { dispatch } = ConnectionModuleActionContext(context)

      const defineMappingEvent: NiaDefineMappingEvent = new NiaDefineMappingEvent(args)
      const event: NiaEvent = defineMappingEvent.toEvent()

      dispatch.sendEvent(event)
    },

    changeMapping(context, args: NiaChangeMappingEventObject): void {
      const { dispatch } = ConnectionModuleActionContext(context)

      const changeMappingEvent: NiaChangeMappingEvent = new NiaChangeMappingEvent(args)
      const event: NiaEvent = changeMappingEvent.toEvent()

      dispatch.sendEvent(event)
    },

    removeMapping(context, args: NiaRemoveMappingEventObject): void {
      const { dispatch } = ConnectionModuleActionContext(context)

      const removeMappingEvent: NiaRemoveMappingEvent = new NiaRemoveMappingEvent(args)
      const event: NiaEvent = removeMappingEvent.toEvent()

      dispatch.sendEvent(event)
    },

    startListening(context): void {
      const { dispatch } = ConnectionModuleActionContext(context)

      const startListeningEvent: NiaStartListeningEvent = new NiaStartListeningEvent()
      const event: NiaEvent = startListeningEvent.toEvent()

      dispatch.sendEvent(event)
    },

    stopListening(context): void {
      const { dispatch } = ConnectionModuleActionContext(context)

      const removeMappingEvent: NiaStopListeningEvent = new NiaStopListeningEvent()
      const event: NiaEvent = removeMappingEvent.toEvent()

      dispatch.sendEvent(event)
    },

    // event response handlers
    handleSynchronizeEventResponse(context, response: NiaSynchronizeEventResponse): void {
      const { rootCommit } = rootActionContext(context)

      const version: string = response.getVersion()
      const info: string = response.getInfo()
      const listening: boolean = response.isListening()
      const devicesInfo: Array<NiaDeviceInfo> = response.getDevicesInfo()
      const definedModifiers: Array<NiaModifierDescription> = response.getDefinedModifiers()
      const definedActions: Array<NiaNamedAction> = response.getDefinedActions()
      const definedMappings: Array<NiaMapping> = response.getDefinedMappings()

      rootCommit.Keymapping.ServerInfo.setInfo(info)
      rootCommit.Keymapping.ServerInfo.setVersion(version)
      rootCommit.Keymapping.Listening.setListening(listening)
      rootCommit.Keymapping.DevicesInfo.setDevicesInfo(devicesInfo)
      rootCommit.Keymapping.Modifiers.setModifiers(definedModifiers)
      rootCommit.Keymapping.Actions.setActions(definedActions)
      rootCommit.Keymapping.Mappings.setMappings(definedMappings)
    },
    handleExecuteCodeEventResponse(context, response: NiaExecuteCodeEventResponse): void {
      const { rootCommit } = ConnectionModuleActionContext(context)
      const executionResult: ExecutionResult = response.toExecutionResult()

      rootCommit.Editor.addExecutionResult(executionResult)
    },
    handleDefineDeviceResponse(context, response: NiaDefineDeviceEventResponse): void {
      const { rootCommit } = ConnectionModuleActionContext(context)

      rootCommit.Keymapping.DevicesInfo.makeDeviceDefined(response.getDeviceId())
    },
    handleRemoveDeviceResponse(context, response: NiaRemoveDeviceEventResponse): void {
      const { rootCommit } = ConnectionModuleActionContext(context)

      rootCommit.Keymapping.DevicesInfo.makeDeviceRemoved(response.getDevicePath())
    },
    handleDefineModifierResponse(context, response: NiaDefineModifierEventResponse): void {
      const { rootCommit } = ConnectionModuleActionContext(context)

      const modifier: NiaModifierDescription = response.getModifier()

      rootCommit.Keymapping.Modifiers.defineModifier(modifier)
    },
    handleRemoveModifierResponse(context, response: NiaRemoveModifierEventResponse): void {
      const { rootCommit } = ConnectionModuleActionContext(context)

      if (response.isSuccess()) {
        const modifierKey: NiaKey = response.toModifierKey()
        rootCommit.Keymapping.Modifiers.removeModifier(modifierKey)
      } else if (response.isError()) {
        // show error
      } else {
        // show failure
      }
    },
    handleDefineActionResponse(context, response: NiaDefineActionEventResponse): void {
      const { rootCommit } = ConnectionModuleActionContext(context)

      if (response.isSuccess()) {
        rootCommit.Keymapping.Actions.defineAction(response.getAction())
        rootCommit.UI.AddActionDialog.hide()
      } else if (response.isError()) {
        // show error
      } else {
        // show failure
      }
    },
    handleRemoveActionResponse(context, response: NiaRemoveActionEventResponse): void {
      const { rootCommit } = ConnectionModuleActionContext(context)

      rootCommit.Keymapping.Actions.removeAction(response.getActionName())
    },
    handleDefineMappingResponse(context, response: NiaDefineMappingEventResponse): void {
      const { rootCommit } = ConnectionModuleActionContext(context)

      if (response.isSuccess()) {
        rootCommit.Keymapping.Mappings.defineMapping(response.getMapping())
        rootCommit.UI.AddMappingDialog.hide()
      }
    },
    handleChangeMappingResponse(context, response: NiaChangeMappingEventResponse): void {
      const { rootCommit } = ConnectionModuleActionContext(context)

      if (response.isSuccess()) {
        rootCommit.Keymapping.Mappings.changeMapping({
            keyChords: response.getKeyChords(),
            action: response.getAction(),
          },
        )
      }
    },
    handleRemoveMappingResponse(context, response: NiaRemoveMappingEventResponse): void {
      const { rootCommit } = ConnectionModuleActionContext(context)

      if (response.isSuccess()) {
        rootCommit.Keymapping.Mappings.removeMapping(response.getKeyChords())
        rootCommit.UI.General.unselectMapping()
      } else {
        // errors ...
      }
    },
    handleStartListeningResponse(context, response: NiaStartListeningEventResponse): void {
      const { rootCommit } = ConnectionModuleActionContext(context)

      if (response.getSuccess()) {
        rootCommit.Keymapping.Listening.setListening(true)
      } else {
        // errors ...
      }
    },
    handleStopListeningResponse(context, response: NiaStopListeningEventResponse): void {
      const { rootCommit } = ConnectionModuleActionContext(context)
      logger.debug('Got stop listening event response:')
      logger.debug(response)

      if (response.getSuccess()) {
        rootCommit.Keymapping.Listening.setListening(false)
      } else {
        // errors ...
      }
    },
    handleEventResponse(context, response: NiaEventResponse): void {
      const { dispatch } = ConnectionModuleActionContext(context)

      if (response.isSynchronizeEventResponse()) {
        dispatch.handleSynchronizeEventResponse(response.takeSynchronizeEventResponse())
      } else if (response.isExecuteCodeEventResponse()) {
        dispatch.handleExecuteCodeEventResponse(response.takeExecuteCodeEventResponse())
      } else if (response.isDefineDeviceEventResponse()) {
        dispatch.handleDefineDeviceResponse(response.takeDefineDeviceEventResponse())
      } else if (response.isRemoveDeviceEventResponse()) {
        dispatch.handleRemoveDeviceResponse(response.takeRemoveDeviceEventResponse())
      } else if (response.isDefineModifierEventResponse()) {
        dispatch.handleDefineModifierResponse(response.takeDefineModifierEventResponse())
      } else if (response.isRemoveModifierEventResponse()) {
        dispatch.handleRemoveModifierResponse(response.takeRemoveModifierEventResponse())
      } else if (response.isDefineActionEventResponse()) {
        dispatch.handleDefineActionResponse(response.takeDefineActionEventResponse())
      } else if (response.isRemoveActionEventResponse()) {
        dispatch.handleRemoveActionResponse(response.takeRemoveActionEventResponse())
      } else if (response.isDefineMappingEventResponse()) {
        dispatch.handleDefineMappingResponse(response.takeDefineMappingEventResponse())
      } else if (response.isChangeMappingEventResponse()) {
        dispatch.handleChangeMappingResponse(response.takeChangeMappingEventResponse())
      } else if (response.isRemoveMappingEventResponse()) {
        dispatch.handleRemoveMappingResponse(response.takeRemoveMappingEventResponse())
      } else if (response.isStartListeningEventResponse()) {
        dispatch.handleStartListeningResponse(response.takeStartListeningEventResponse())
      } else if (response.isStopListeningEventResponse()) {
        dispatch.handleStopListeningResponse(response.takeStopListeningEventResponse())
      } else {
        console.log('unknown')
      }
    },
  },
})

export default ConnectionModule
const ConnectionModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, ConnectionModule)
const ConnectionModuleActionContext = (context: any) => moduleActionContext(context, ConnectionModule)
