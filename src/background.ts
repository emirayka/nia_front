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

import {NiaServerEventHandler} from '@/utils/server-event-handle'
import {NiaFileEventHandler} from '@/utils/file-event-handle'

const isDevelopment = process.env.NODE_ENV !== 'production'

let win: BrowserWindow | null

async function createWindow() {
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

  let serverEventHandler: NiaServerEventHandler | null = null
  let fileEventHandler: NiaFileEventHandler | null = null

  ipcMain.on('nia-client-ready', async () => {
    if (win === null) {
      throw new Error('Somehow, window were not initialized')
    }

    if (serverEventHandler === null) {
      serverEventHandler = new NiaServerEventHandler(win)
    } else {
      serverEventHandler.restart()
    }

    if (fileEventHandler === null) {
      fileEventHandler = new NiaFileEventHandler(win)
    }
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

