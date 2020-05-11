'use strict'

import os from 'os'
import path from 'path'

import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
} from 'electron'

import {
  createProtocol,
  installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib'

import {
  Protocol,
} from './utils'
import NiaHandshakeResponse from '@/utils/protocol/response/handshake-response.js'
import NiaGetDeviceInfoResponse from '@/utils/protocol/response/get-device-info-response.js'
import NiaGetDevicesResponse from '@/utils/protocol/response/get-devices-response.js'
import NiaHandshakeResult from '@/utils/protocol/result/handshake-result.js'
import {NiaGetDeviceInfoResult, NiaGetDevicesResult} from '@/utils/protocol/result'
import NiaExecuteCodeResult from '@/utils/protocol/result/execute-code-result.js'
import NiaDefineKeyboardResult from '@/utils/protocol/result/define-keyboard-result'
import DeviceInfo from '@/store/models/device-info'
import NiaEvent from '@/utils/event/events/event'
import NiaEventResponse from '@/utils/event/responses/response'
import {NiaHandler, startHandler} from '@/utils/handle'
import IpcMainEvent = Electron.IpcMainEvent

const isDevelopment = process.env.NODE_ENV !== 'production'

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 1920,
    height: 1080,
    resizable: false,
    frame: false,
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

(() => {
  protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })

  app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
      try {
        await installVueDevtools()
        BrowserWindow.addDevToolsExtension(
          path.join(os.homedir(), '/.config/google-chrome/Default/Extensions/'),
        )
      } catch (e) {
        console.error('Vue Devtools failed to install:', e.toString())
      }
    }

    createWindow()
  })

  if (isDevelopment) {
    if (process.platform === 'win32') {
      process.on('message', data => {
        if (data === 'graceful-exit') {
          app.quit()
        }
      })
    } else {
      process.on('SIGTERM', () => {
        app.quit()
      })
    }
  }
})()

ipcMain.once('nia-server-event', async (_, event: NiaEvent) => {
  try {
    if (win === null) {
      throw new Error('Window is not ready')
    }

    const handler: NiaHandler = await startHandler(win, event)

    ipcMain.on('nia-server-event', handler)
  } catch (e) {
    console.error(e)
  }
})
