'use strict'

import os from 'os'
import path from 'path'

import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
} from 'electron'
import IpcMainEvent = Electron.IpcMainEvent

import {
  createProtocol,
  installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib'

import { DeviceInfo } from '@/store/models'
import {NiaEventSerialized, Protocol} from '@/utils'
import { NiaEvent, } from '@/utils'
import {NiaHandler, startHandler} from '@/utils/handle'

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

ipcMain.once('nia-server-event', async (_, serializedEvent: NiaEventSerialized) => {
  try {
    if (win === null) {
      throw new Error('Window is not ready')
    }
    const handler: NiaHandler = await startHandler(win, serializedEvent)

    ipcMain.on('nia-server-event', handler)
  } catch (e) {
    console.error(e)
  }
})
