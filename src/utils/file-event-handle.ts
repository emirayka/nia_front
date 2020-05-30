import IpcMainEvent = Electron.IpcMainEvent
import BrowserWindow = Electron.BrowserWindow
import loggers from '@/utils/logger'
import {
  NiaFileEvent,
  NiaFileEventResponse,
  NiaFileEventSerialized,
  NiaFileEventType,
  NiaListConfigDirectoryEvent,
  NiaListConfigDirectoryEventResponse,
  NiaNewDirectoryEvent, NiaNewDirectoryEventResponse,
  NiaNewFileEvent, NiaNewFileEventResponse,
  NiaOpenFileEvent,
  NiaOpenFileEventResponse,
} from '@/utils/file-event'
import {getConfigDirectoryTree, readFileContent, saveFileContent, TreePart} from '@/utils/file'
import {ipcMain} from "electron"
import {NiaSaveFileEventResponse} from '@/utils/file-event/responses/save-file-event-response'
import {NiaSaveFileEvent} from '@/utils/file-event/events/save-file-event'
import {makeNewDirectory} from '@/utils/file/make-new-directory'
import {makeNewFile} from '@/utils/file/make-new-file'
import {NiaDeleteEventResponse} from '@/utils/file-event/responses/delete-event-response'
import {NiaDeleteEvent} from '@/utils/file-event/events/delete-event'
import {deletePaths} from '@/utils/file/delete-paths'

const logger = loggers('file-event-handler')

const handleListConfigDirectoryEvent = async (event: NiaListConfigDirectoryEvent): Promise<NiaFileEventResponse> => {
  const configTree: TreePart = await getConfigDirectoryTree()

  const response = new NiaListConfigDirectoryEventResponse({
    configTree,
  })

  return response.toFileEventResponse()
}

const handleOpenFileEvent = async (event: NiaOpenFileEvent): Promise<NiaFileEventResponse> => {
  const fullPath: string = event.getFullPath()
  const fileContent: string = await readFileContent(fullPath)

  try {
    const response: NiaOpenFileEventResponse = new NiaOpenFileEventResponse({
      fullPath,
      fileContent,
      message: '',
      success: true
    })

    return response.toFileEventResponse()
  }
  catch (e) {
    const response: NiaOpenFileEventResponse = new NiaOpenFileEventResponse({
      fullPath,
      fileContent,
      message: e.getMessage(),
      success: false
    })

    return response.toFileEventResponse()
  }
}

const handleSaveFileEvent = async (event: NiaSaveFileEvent): Promise<NiaFileEventResponse> => {
  const fullPath: string = event.getFullPath()
  const fileContent: string = event.getFileContent()

  try {
    await saveFileContent(fullPath, fileContent)

    const response: NiaSaveFileEventResponse = new NiaSaveFileEventResponse({
      fullPath,
      fileContent,
      message: '',
      success: true
    })

    return response.toFileEventResponse()
  }
  catch (e) {
    const response: NiaSaveFileEventResponse = new NiaSaveFileEventResponse({
      fullPath,
      fileContent,
      message: e.getMessage(),
      success: false
    })

    return response.toFileEventResponse()
  }
}

const handleNewFileEvent = async (event: NiaNewFileEvent): Promise<NiaFileEventResponse> => {
  const fullPath: string = event.getFullPath()

  try {
    await makeNewFile(fullPath)

    const response: NiaNewFileEventResponse = new NiaNewFileEventResponse({
      fullPath,
      message: '',
      success: true
    })

    return response.toFileEventResponse()
  }
  catch (e) {
    const response: NiaNewFileEventResponse = new NiaNewFileEventResponse({
      fullPath,
      message: e.getMessage(),
      success: false
    })

    return response.toFileEventResponse()
  }
}

const handleNewDirectoryEvent = async (event: NiaNewDirectoryEvent): Promise<NiaFileEventResponse> => {
  const fullPath: string = event.getFullPath()

  try {
    await makeNewDirectory(fullPath)

    const response: NiaNewDirectoryEventResponse = new NiaNewDirectoryEventResponse({
      fullPath,
      message: '',
      success: true
    })

    return response.toFileEventResponse()
  }
  catch (e) {
    const response: NiaNewDirectoryEventResponse = new NiaNewDirectoryEventResponse({
      fullPath,
      message: e.getMessage(),
      success: false
    })

    return response.toFileEventResponse()
  }
}

const handleDeleteEvent = async (event: NiaDeleteEvent): Promise<NiaFileEventResponse> => {
  const paths: Array<string> = event.getPaths()

  try {
    await deletePaths(paths)

    const response: NiaDeleteEventResponse = new NiaDeleteEventResponse({
      paths,
      message: '',
      success: true
    })

    return response.toFileEventResponse()
  }
  catch (e) {
    const response: NiaDeleteEventResponse = new NiaDeleteEventResponse({
      paths,
      message: e.getMessage(),
      success: false
    })

    return response.toFileEventResponse()
  }
}

const handleEvent = async (
  event: NiaFileEvent,
): Promise<NiaFileEventResponse> => {
  logger.debug('Got file event:')
  logger.debug(event)

  switch (event.getEventType()) {
    case NiaFileEventType.ListConfigDirectory:
      return handleListConfigDirectoryEvent(event.getEvent() as NiaListConfigDirectoryEvent)

    case NiaFileEventType.OpenFile:
      return handleOpenFileEvent(event.getEvent() as NiaOpenFileEvent)

    case NiaFileEventType.SaveFile:
      return handleSaveFileEvent(event.getEvent() as NiaSaveFileEvent)

    case NiaFileEventType.NewFile:
      return handleNewFileEvent(event.getEvent() as NiaNewFileEvent)

    case NiaFileEventType.NewDirectory:
      return handleNewDirectoryEvent(event.getEvent() as NiaNewDirectoryEvent)

    case NiaFileEventType.Delete:
      return handleDeleteEvent(event.getEvent() as NiaDeleteEvent)
  }

  throw new Error('Unknown file event was passed')
}

export type NiaFileEventHandlerFunc = (_: IpcMainEvent, serializedEvent: NiaFileEventSerialized) => void

export class NiaFileEventHandler {
  private readonly win: BrowserWindow
  private readonly handler: NiaFileEventHandlerFunc | null

  constructor(win: BrowserWindow) {
    this.win = win

    this.handler = async (_: IpcMainEvent, serializedEvent: NiaFileEventSerialized) => {
      try {
        logger.debug('Got serialized event:')
        logger.debug(serializedEvent)

        const event: NiaFileEvent = NiaFileEvent.deserialize(serializedEvent)
        const eventResponse = await handleEvent(event)

        const eventResponseSerialized = eventResponse.serialize()
        this.win.webContents.send('nia-file-event-response', eventResponseSerialized)
      } catch (e) {
        logger.error(`Error during handling file event: ${e}.`)
      }
    }

    ipcMain.on('nia-file-event', this.handler)
  }
}