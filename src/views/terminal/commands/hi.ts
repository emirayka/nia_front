// @ts-ignore
import {createStdout} from 'vue-command'

import store from '@/store'

export default () => {
  return new Promise((resolve) => {
    store.dispatch.Connection.executeTerminalCode({
      code: '(string:concat "Hello " ":3")',
    })

    const handler = (message: string) => {
      resolve(createStdout(message))
    }

    store.commit.Terminal.addHandler(handler)
  })
}