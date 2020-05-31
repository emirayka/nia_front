import Vue from 'vue'
import {defineModule} from 'direct-vuex'
import {moduleActionContext, moduleGetterContext} from '@/store'

import {getConfigDirectoryTree, TreePart} from '@/utils'

export interface NiaFile {
  fullPath: string,
  name: string,
  fileContent: string,
  saved: boolean,
  markedForDeletion: boolean,
}

export interface FileModuleState {
  configTree: TreePart | null,
  openedFiles: {
    [key: string]: NiaFile
  }
}

export interface SetFileContentPayload {
  fullPath: string,
  newContent: string
}

export interface SetFileSavedPayload {
  fullPath: string,
  saved: boolean
}

export interface SetFileSelectedPayload {
  fullPath: string,
  saved: boolean
}

const FileModule = defineModule({
  namespaced: true as true,
  state: {
    configTree: null,
    openedFiles: {}
  } as FileModuleState,
  getters: {
    configTree: (state: FileModuleState) => state.configTree,
    openedFiles: (state: FileModuleState) => state.openedFiles,
    isFileOpened: (state: FileModuleState) => (fullPath: string) => state.openedFiles[fullPath] !== undefined,
    getFileByPath: (state: FileModuleState) => (fullPath: string): NiaFile | null => {
      for (const file of Object.values(state.openedFiles)) {
        if (file.fullPath === fullPath) {
          return file
        }
      }

      return null
    },
  },
  mutations: {
    setConfigTree: (state: FileModuleState, configTree: TreePart) => {
      state.configTree = configTree
    },
    setOpenedFile: (state: FileModuleState, openedFile: NiaFile) => {
      Vue.set(state.openedFiles, openedFile.fullPath, openedFile)
    },
    setFileContent: (state: FileModuleState, payload: SetFileContentPayload) => {
      if (state.openedFiles.hasOwnProperty(payload.fullPath)) {
        state.openedFiles[payload.fullPath].fileContent = payload.newContent
        state.openedFiles[payload.fullPath].saved = false
      }
    },
    setFileSaved: (state: FileModuleState, payload: SetFileSavedPayload) => {
      if (state.openedFiles.hasOwnProperty(payload.fullPath)) {
        state.openedFiles[payload.fullPath].saved = payload.saved
      }
    },
    setFileSelected: (state: FileModuleState, payload: SetFileSelectedPayload) => {
      const fullPath: string = payload.fullPath
      console.log(fullPath)
    },
    closePath: (state: FileModuleState, path: string) => {
      if (state.openedFiles.hasOwnProperty(path)) {
        state.openedFiles[path].markedForDeletion = true
      }

      Vue.delete(state.openedFiles, path)
    },
    closePaths: (state: FileModuleState, paths: Array<string>) => {
      for (const path of paths) {
        if (state.openedFiles.hasOwnProperty(path)) {
          state.openedFiles[path].markedForDeletion = true
        }
      }

      for (const path of paths) {
        if (state.openedFiles.hasOwnProperty(path)) {
          Vue.delete(state.openedFiles, path)
        }
      }
    }
  },
})

export default FileModule
const FileModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, FileModule)
const FileModuleActionContext = (context: any) => moduleActionContext(context, FileModule)
