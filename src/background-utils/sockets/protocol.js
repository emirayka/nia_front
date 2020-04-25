import WebSocket from 'ws'

import NiaProtocolJs from 'nia-protocol-js'

import {
  buildRegisterKeyboardCode,
  buildDefineModifierCode,
  buildDefineGlobalMappingCode,
  buildStartListeningCode,
  buildStoptListeningCode
} from '../code-builder'

export default class {
  constructor(port) {
    this._port = port
    this._ws = new WebSocket(`ws://127.0.0.1:${port}`)
    this._ready = false

    this._ws.once('open', () => {
      this._ready = true
    })
  }

  ready() {
    if (this._ready) {
      return Promise.resolve()
    } else {
      return new Promise((resolve) => {
        this._ws.once('open', () => {
          resolve()
        })
      })
    }
  }

  handshake() {
    const handshakeRequest = new NiaProtocolJs.HandshakeRequest()
    const request = new NiaProtocolJs.Request()

    request.setHandshakeRequest(handshakeRequest)

    return new Promise((resolve, reject) => {
      this._ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response = NiaProtocolJs.Response.deserializeBinary(message)

          if (response.hasHandshakeResponse()) {
            const handshakeResponse = response.getHandshakeResponse()

            if (handshakeResponse.hasSuccessResult()) {
              const successResult = handshakeResponse.getSuccessResult()

              resolve({
                version: successResult.getVersion(),
                info: successResult.getInfo(),
              })
            } else {
              const errorResult = handshakeResponse.getErrorResult()

              reject(errorResult.getMessage())
            }
          } else {
            reject()
          }
        } else {
          reject()
        }
      })
      this._ws.send(request.serializeBinary())
    })
  }

  getDevices() {
    const getDevicesRequest = new NiaProtocolJs.GetDevicesRequest()
    const request = new NiaProtocolJs.Request()

    request.setGetDevicesRequest(getDevicesRequest)

    return new Promise((resolve, reject) => {
      this._ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response = NiaProtocolJs.Response.deserializeBinary(message)

          if (response.hasGetDevicesResponse()) {
            const getDevicesResponse = response.getGetDevicesResponse()

            if (getDevicesResponse.hasSuccessResult()) {
              const successResult = getDevicesResponse.getSuccessResult()
              const devices = successResult.getDevicesList()

              resolve(devices)
            } else {
              const errorResult = getDevicesResponse.getErrorResult()

              reject(errorResult.getMessage())
            }
          } else {
            reject()
          }
        } else {
          reject()
        }
      })

      this._ws.send(request.serializeBinary())
    })
  }

  getDeviceInfo(device) {
    const getDeviceInfoRequest = new NiaProtocolJs.GetDeviceInfoRequest()
    getDeviceInfoRequest.setDevice(device)

    const request = new NiaProtocolJs.Request()
    request.setGetDeviceInfoRequest(getDeviceInfoRequest)

    return new Promise((resolve, reject) => {
      this._ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response = NiaProtocolJs.Response.deserializeBinary(message)

          if (response.hasGetDeviceInfoResponse()) {
            const getDeviceInfoResponse = response.getGetDeviceInfoResponse()

            if (getDeviceInfoResponse.hasSuccessResult()) {
              const successResult = getDeviceInfoResponse.getSuccessResult()

              resolve({
                name: successResult.getName(),
                device: successResult.getDevice(),
                model: successResult.getModel(),
              })
            } else {
              const errorResult = getDeviceInfoResponse.getErrorResult()

              reject(errorResult.getMessage())
            }
          } else {
            reject()
          }
        } else {
          reject()
        }
      })

      this._ws.send(request.serializeBinary())
    })
  }

  getMultipleDeviceInfo(devices) {
    const devicesInfo = []

    return new Promise(resolve => {
      let p = Promise.resolve()

      for (const device of devices) {
        p = p.then(() => {
          return this.getDeviceInfo(device)
            .then(deviceInfo => devicesInfo.push(deviceInfo))
        })
      }
      p.then(() => resolve(devicesInfo))
    })
  }

  executeCode(code) {
    const executeCodeRequest = new NiaProtocolJs.ExecuteCodeRequest()
    executeCodeRequest.setCode(code)

    const request = new NiaProtocolJs.Request()
    request.setExecuteCodeRequest(executeCodeRequest)

    return new Promise((resolve, reject) => {
      this._ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response = NiaProtocolJs.Response.deserializeBinary(message)

          if (response.hasExecuteCodeResponse()) {
            const executeCodeResponse = response.getExecuteCodeResponse()

            if (executeCodeResponse.hasSuccessResult()) {
              const successResult = executeCodeResponse.getSuccessResult()

              resolve({
                failure: false,
                error: false,
                success: true,
                result: successResult.getExecutionResult(),
              })
            } else if (executeCodeResponse.hasErrorResult()) {
              const errorResult = executeCodeResponse.getErrorResult()

              resolve({
                failure: false,
                error: true,
                success: false,
                message: errorResult.getMessage(),
              })
            } else if (executeCodeResponse.hasFailureResult()) {
              const failureResult = executeCodeResponse.getFailureResult()

              resolve({
                failure: true,
                error: false,
                success: false,
                message: failureResult.getMessage(),
              })
            } else {
              reject()
            }
          } else {
            reject()
          }
        } else {
          reject()
        }
      })

      this._ws.send(request.serializeBinary())
    })
  }

  registerKeyboard(path, name) {
    const code = buildRegisterKeyboardCode(path, name)

    return this.executeCode(code)
  }

  defineModifier(keyId, keyboardId) {
    const code = buildDefineModifierCode(keyId, keyboardId)

    return this.executeCode(code)
  }

  defineGlobalMapping(keyChords, action) {
    const code = buildDefineGlobalMappingCode(keyChords, action)

    return this.executeCode(code)
  }

  startListening() {
    const code = buildStartListeningCode()

    return this.executeCode(code)
  }

  stopListening() {
    const code = buildStoptListeningCode()

    return this.executeCode(code)
  }
}