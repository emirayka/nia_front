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
import NiaHandshakeResponse from '@/background-utils/protocol/response/handshake-response.js'
import NiaGetDeviceInfoResponse from '@/background-utils/protocol/response/get-device-info-response.js'
import NiaGetDevicesResponse from '@/background-utils/protocol/response/get-devices-response.js'
import NiaHandshakeResult from '@/background-utils/protocol/domain/handshake-result.js'
import {NiaGetDeviceInfoResult, NiaGetDevicesResult} from '@/background-utils/protocol/domain'
import NiaExecuteCodeResult from '@/background-utils/protocol/domain/execute-code-result.js'

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

let niaProtocol: Protocol | null = null

ipcMain.once('nia-app-mounted', async () => {
  try {
    if (win === null) {
      throw new Error('window is not ready')
    }

    niaProtocol = new Protocol(12112)
    await niaProtocol.is_ready()

    const handshakeResult: NiaHandshakeResult = await niaProtocol.handshake()
    win.webContents.send('nia-server-handshake-result', handshakeResult)

    const getDevicesResponse: NiaGetDevicesResult = await niaProtocol.getDevices()
    win.webContents.send('nia-server-get-devices-result', getDevicesResponse)

    let devicesInfo: Array<NiaGetDeviceInfoResult> = await niaProtocol.getMultipleDeviceInfo(getDevicesResponse)

    devicesInfo = devicesInfo.map(deviceInfo => {
      let parsedModel = JSON.parse(deviceInfo.model)

      const newDeviceInfo = {
        ...deviceInfo,
        model: parsedModel,
      }

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

  await niaProtocol.is_ready()

  const executionResult: NiaExecuteCodeResult = await niaProtocol.executeCode(event.code)

  win.webContents.send('nia-server-execute-code-result', executionResult)
})
