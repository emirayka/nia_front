// @ts-ignore
import {createStdout} from 'vue-command'

import store from '@/store'

export default () => {
  return new Promise((resolve) => {
    const handler = (message: string) => {
      resolve(createStdout(message))
    }

    store.commit.Terminal.addHandler(handler)
    store.dispatch.Connection.startListening()
  })
}
