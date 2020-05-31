import {defineModule} from 'direct-vuex'

import loggers from '@/utils/logger'

const logger = loggers('Action Table Module')

import {moduleActionContext, moduleGetterContext} from '@/store'

import {NiaNamedAction, TreePart} from '@/utils'
import {NiaFile} from '@/store/modules/file'

export interface OpenedFilesState {
  openedFile: NiaFile | null
}

const OpenedFilesModule = defineModule({
  namespaced: true,
  state: {
    openedFile: null,
  } as OpenedFilesState,
  getters: {
    openedFile: (state: OpenedFilesState) => state.openedFile,
  },
  mutations: {
    setOpenedFile: (state: OpenedFilesState, file: NiaFile) => state.openedFile = file
  },
})

export default OpenedFilesModule

const OpenedFilesModuleGetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, OpenedFilesModule)
const OpenedFilesModuleActionContext = (context: any) => moduleActionContext(context, OpenedFilesModule)
