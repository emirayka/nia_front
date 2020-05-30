import {defineModule} from 'direct-vuex'

const {
  ipcRenderer,
} = window.require("electron");

import loggers from '@/utils/logger'
const logger = loggers('file-connection')

import {
  NiaEvent,
  NiaFileEvent,
  NiaFileEventResponse,
  NiaFileEventResponseSerialized,
  NiaFileEventResponseType,
  NiaListConfigDirectoryEvent,
  NiaListConfigDirectoryEventResponse, NiaNewDirectoryEvent,
  NiaNewDirectoryEventResponse, NiaNewFileEvent,
  NiaNewFileEventResponse,
  NiaOpenFileEvent,
  NiaOpenFileEventResponse,
  NiaSynchronizeEvent,
  TreePart,
} from '@/utils'
import {moduleActionContext, moduleGetterContext} from '@/store'
import {NiaFile} from '@/store/modules/file'
import {NiaSaveFileEvent} from '@/utils/file-event/events/save-file-event'
import {NiaSaveFileEventResponse} from '@/utils/file-event/responses/save-file-event-response'
import {commands} from 'codemirror'
import {NiaDeleteEvent} from '@/utils/file-event/events/delete-event'
import {NiaDeleteEventResponse} from '@/utils/file-event/responses/delete-event-response'

type IPCListener = (_: any, eventResponse: NiaFileEventResponseSerialized) => void;
type Listener = () => void;

export interface FileConnectionModuleState {
  ipcListener: IPCListener | null,
  autoSave: number | null
}

const FileConnectionModule = defineModule({
  namespaced: true,
  state: {
    ipcListener: null,
    autoSave: null,
  } as FileConnectionModuleState,
  getters: {
    ipcListener: (state: FileConnectionModuleState): IPCListener | null => {
      return state.ipcListener
    },
    autoSave: (state: FileConnectionModuleState): number | null => {
      return state.autoSave
    },
  },
  mutations: {
    setIPCListener(state: FileConnectionModuleState, listener: IPCListener | null): void {
      state.ipcListener = listener
    },
    setAutoSave(state: FileConnectionModuleState, autoSave: number | null): void {
      state.autoSave = autoSave
    },
  },
  actions: {
    // connectors
    connectIPCListener(context): void {
      const { commit, dispatch, getters } = FileConnectionModuleActionContext(context)

      if (getters.ipcListener !== null) {
        return
      }

      const listener = (_: any, eventResponseSerialized: NiaFileEventResponseSerialized) => {
        const eventResponse: NiaFileEventResponse = NiaFileEventResponse.deserialize(eventResponseSerialized)

        dispatch.handleFileEventResponse(eventResponse)
      }

      commit.setIPCListener(listener)
      ipcRenderer.on('nia-file-event-response', listener)
    },

    disconnectIPCListener(context): void {
      const { commit, getters } = FileConnectionModuleActionContext(context)

      if (getters.ipcListener === null) {
        return
      }

      ipcRenderer.removeListener('nia-file-event-response', getters.ipcListener)

      commit.setIPCListener(null)
    },

    // threads
    startAutoSaving(context): void {
      const { getters, commit, dispatch, rootGetters } = FileConnectionModuleActionContext(context)

      if (getters.autoSave !== null) {
        return
      }

      const listener: Listener = () => {
        const openedFiles: Array<NiaFile> = Object.values(rootGetters.File.openedFiles)

        for (const openedFile of openedFiles) {
          if (!openedFile.saved && !openedFile.markedForDeletion) {
            dispatch.saveFile(openedFile)
          }
        }
      }

      commit.setAutoSave(window.setInterval(listener, 5000))
    },

    stopAutoSaving(context): void {
      const { getters, commit, dispatch, rootGetters } = FileConnectionModuleActionContext(context)

      if (getters.autoSave === null) {
        return
      }

      window.clearInterval(getters.autoSave)
      commit.setAutoSave(null)
    },

    // event senders
    sendEvent(context, event: NiaFileEvent): void {
      ipcRenderer.send('nia-file-event', event.serialize())
    },

    listConfigDirectory(context): void {
      const { dispatch } = FileConnectionModuleActionContext(context)

      const listConfigDirectory: NiaListConfigDirectoryEvent = new NiaListConfigDirectoryEvent({})
      const event: NiaFileEvent = listConfigDirectory.toFileEvent()

      dispatch.sendEvent(event)
    },

    openFile(context, fullPath: string): void {
      const { dispatch } = FileConnectionModuleActionContext(context)

      const openFileEvent: NiaOpenFileEvent = new NiaOpenFileEvent({
        fullPath,
      })
      const event: NiaFileEvent = openFileEvent.toFileEvent()

      dispatch.sendEvent(event)
    },

    saveFile(context, file: NiaFile): void {
      const { dispatch } = FileConnectionModuleActionContext(context)

      const saveFileEvent: NiaSaveFileEvent = new NiaSaveFileEvent({
        fullPath: file.fullPath,
        fileContent: file.fileContent,
      })
      const event: NiaFileEvent = saveFileEvent.toFileEvent()

      dispatch.sendEvent(event)
    },

    newFile(context, fullPath: string): void {
      const { dispatch } = FileConnectionModuleActionContext(context)

      const newFileEvent: NiaNewFileEvent = new NiaNewFileEvent({
        fullPath,
      })
      const event: NiaFileEvent = newFileEvent.toFileEvent()

      logger.debug('Sending new file event:')
      logger.debug(newFileEvent)
      logger.debug(event)

      dispatch.sendEvent(event)
    },

    newDirectory(context, fullPath: string): void {
      const { dispatch } = FileConnectionModuleActionContext(context)

      const newDirectoryEvent: NiaNewDirectoryEvent = new NiaNewDirectoryEvent({
        fullPath,
      })
      const event: NiaFileEvent = newDirectoryEvent.toFileEvent()

      logger.debug('Sending new directory event:')
      logger.debug(newDirectoryEvent)
      logger.debug(event)

      dispatch.sendEvent(event)
    },

    delete(context, paths: Array<string>): void {
      const { rootCommit, dispatch } = FileConnectionModuleActionContext(context)

      rootCommit.File.closePaths(paths)

      const deleteEvent: NiaDeleteEvent = new NiaDeleteEvent({
        paths,
      })
      const event: NiaFileEvent = deleteEvent.toFileEvent()

      logger.debug('Sending delete event:')
      logger.debug(deleteEvent)
      logger.debug(event)

      dispatch.sendEvent(event)
    },

    // event handlers
    handleListConfigDirectoryResponse(context, response: NiaListConfigDirectoryEventResponse): void {
      const { rootCommit } = FileConnectionModuleActionContext(context)

      const configTree: TreePart = response.getConfigTree()

      rootCommit.File.setConfigTree(configTree)
    },

    handleOpenFile(context, response: NiaOpenFileEventResponse): void {
      const { rootCommit } = FileConnectionModuleActionContext(context)

      const file: NiaFile = response.toFile()

      rootCommit.File.setOpenedFile(file)
    },

    handleSaveFile(context, response: NiaSaveFileEventResponse): void {
      const { rootCommit } = FileConnectionModuleActionContext(context)

      const fullPath: string = response.getFullPath()

      rootCommit.File.setFileSaved({
        fullPath,
        saved: true,
      })
    },

    handleNewFile(context, response: NiaNewFileEventResponse): void {
      const { dispatch, rootCommit } = FileConnectionModuleActionContext(context)

      if (response.isSuccess()) {
        dispatch.listConfigDirectory()
        rootCommit.UI.NewFileDialog.hide()
      } else {
        rootCommit.UI.ErrorDialog.show(response.getMessage())
      }
    },

    handleNewDirectory(context, response: NiaNewDirectoryEventResponse): void {
      const { dispatch, rootCommit } = FileConnectionModuleActionContext(context)

      if (response.isSuccess()) {
        dispatch.listConfigDirectory()
        rootCommit.UI.NewDirectoryDialog.hide()
      } else {
        rootCommit.UI.ErrorDialog.show(response.getMessage())
      }
    },

    handleDelete(context, response: NiaDeleteEventResponse): void {
      const { dispatch, rootCommit } = FileConnectionModuleActionContext(context)

      if (response.isSuccess()) {
        dispatch.listConfigDirectory()
      } else {
        rootCommit.UI.ErrorDialog.show(response.getMessage())
      }
    },

    handleFileEventResponse(context, response: NiaFileEventResponse) {
      const { dispatch } = FileConnectionModuleActionContext(context)

      logger.debug('Got response from main thread:')
      logger.debug(response)

      switch (response.getEventResponseType()) {
        case NiaFileEventResponseType.ListConfigDirectory:
          dispatch.handleListConfigDirectoryResponse(
            response.getEventResponse() as NiaListConfigDirectoryEventResponse,
          )
          break

        case NiaFileEventResponseType.OpenFile:
          dispatch.handleOpenFile(
            response.getEventResponse() as NiaOpenFileEventResponse,
          )
          break

        case NiaFileEventResponseType.SaveFile:
          dispatch.handleSaveFile(
            response.getEventResponse() as NiaSaveFileEventResponse,
          )
          break

        case NiaFileEventResponseType.NewFile:
          dispatch.handleNewFile(
            response.getEventResponse() as NiaNewFileEventResponse,
          )
          break

        case NiaFileEventResponseType.NewDirectory:
          dispatch.handleNewDirectory(
            response.getEventResponse() as NiaNewDirectoryEventResponse,
          )
          break

        case NiaFileEventResponseType.Delete:
          dispatch.handleDelete(
            response.getEventResponse() as NiaDeleteEventResponse,
          )
          break
      }
    },
  },
})

export default FileConnectionModule
const FileConnectionModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, FileConnectionModule)
const FileConnectionModuleActionContext = (context: any) => moduleActionContext(context, FileConnectionModule)
