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
} from './background-utils'


const isDevelopment = process.env.NODE_ENV !== 'production'

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 1024,
    height: 768,
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
          path.join(os.homedir(), '/.config/google-chrome/Default/Extensions/')
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

let niaProtocol = null

ipcMain.once('nia-app-mounted', async () => {
  try {
    if (win === null) {
      throw new Error('window is not ready')
    }

    niaProtocol = new Protocol(12112)
    await niaProtocol.ready()

    const handshakeResponse = await niaProtocol.handshake()
    win.webContents.send('nia-server-handshake-result', handshakeResponse)

    const devices = await niaProtocol.getDevices()
    win.webContents.send('nia-server-get-devices-result', devices)

    let devicesInfo = await niaProtocol.getMultipleDeviceInfo(devices)
    devicesInfo = devicesInfo.map(deviceInfo => {
      let parsedModel = JSON.parse(deviceInfo.model)

      const newDeviceInfo = {
        ...deviceInfo,
        model: parsedModel,
      }

      console.log(newDeviceInfo)

      return newDeviceInfo
    })

    win.webContents.send('nia-server-get-devices-info-result', devicesInfo)
  } catch (e) {
    console.error(e)
  }
})

ipcMain.on('nia-server-execute-code-request', async (_, event) => {
  if (win === null || niaProtocol === null) {
    return
  }

  await niaProtocol.ready()

  const executionResult = await niaProtocol.executeCode(event.code)

  win.webContents.send('nia-server-execute-code-result', executionResult)
})
