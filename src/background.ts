'use strict'

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
    frame: false
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

ipcMain.once('nia-app-mounted', async () => {
  try {
    if (win === null) {
      throw new Error('window is not ready')
    }

    const protocol = new Protocol(12112)
    await protocol.ready()

    const handshakeResponse = await protocol.handshake()
    win.webContents.send('nia-server-handshake', handshakeResponse)

    const devices = await protocol.getDevices()
    win.webContents.send('nia-server-get-devices', devices)

    let devicesInfo = await protocol.getMultipleDeviceInfo(devices)
    devicesInfo = devicesInfo.map(deviceInfo => {
      let parsedModel = JSON.parse(deviceInfo.model)

      const newDeviceInfo = {
        ...deviceInfo,
        model: parsedModel
      }

      console.log(newDeviceInfo)

      return newDeviceInfo
    })

    win.webContents.send('nia-server-get-devices-info', devicesInfo)
  }
  catch (e) {
    console.error(e)
  }
})
