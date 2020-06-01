// @ts-ignore
import {createStdout} from 'vue-command'

import store from '@/store'

export default () => {
  const version: string = store.getters.Keymapping.ServerInfo.version
  const info: string = store.getters.Keymapping.ServerInfo.info

  let message: string = `Version: ${version} <br>`

  message += `Additional information: ${info}`

  return createStdout(message)
}
