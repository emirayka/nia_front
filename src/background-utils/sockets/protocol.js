import WebSocket from 'ws'

import NiaProtocolJs from 'nia-protocol-js'

const makeKeyChordPart = (value) => {
  const keyChordPart = new NiaProtocolJs.KeyChordPart()

  if (value instanceof Array) {
    const keyChordPart2 = new NiaProtocolJs.KeyChordPart.KeyChordPart2()

    keyChordPart2.setKeyboardId(value[0])
    keyChordPart2.setKeyId(value[1])

    keyChordPart.setKeyChordPart2(keyChordPart2)
  } else {
    const keyChordPart1 = new NiaProtocolJs.KeyChordPart.KeyChordPart1()

    keyChordPart1.setKeyId(value)

    keyChordPart.setKeyChordPart1(keyChordPart1)
  }

  return keyChordPart
}

const makeKeyChord = (value) => {
  const modifiers = value[0]
  const key = value[1]

  const modifierKeyChordParts = modifiers.map(makeKeyChordPart)
  const keyKeyChordPart = makeKeyChordPart(key)

  const keyChord = new NiaProtocolJs.KeyChord()

  keyChord.setModifiersList(modifierKeyChordParts)
  keyChord.setKey(keyKeyChordPart)

  return keyChord
}

const makeKeyChords = (keyChords) => {
  return keyChords.map(makeKeyChord)
}

const makeAction = () => {
  return NiaProtocolJs.Action()
}

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
    return new Promise((resolve) => {
      this._ws.once('open', () => {
        resolve()
      })
    })
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

              reject({
                failure: false,
                error: true,
                success: false,
                message: errorResult.getMessage(),
              })
            } else if (executeCodeResponse.hasFailureResult()) {
              const failureResult = executeCodeResponse.getFailureResult()

              reject({
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
    const registerKeyboardRequest = new NiaProtocolJs.RegisterKeyboardRequest()

    registerKeyboardRequest.setDevicePath(path)
    registerKeyboardRequest.setDeviceName(name)

    const request = new NiaProtocolJs.Request()
    request.setRegisterKeyboardRequest(registerKeyboardRequest)

    return new Promise((resolve, reject) => {
      this._ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response = NiaProtocolJs.Response.deserializeBinary(message)

          if (response.hasRegisterKeyboardResponse()) {
            const registerKeyboardResponse = response.getRegisterKeyboardResponse()

            if (registerKeyboardResponse.hasSuccessResult()) {
              resolve()
            } else if (registerKeyboardResponse.hasErrorResult()) {
              reject()
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

  defineModifier(keyId, keyboardId) {
    const defineModifierRequest = new NiaProtocolJs.DefineModifierRequest()

    const keyChordPart = makeKeyChordPart(keyId, keyboardId)
    defineModifierRequest.setKeyChordPart(keyChordPart)

    const request = new NiaProtocolJs.Request()
    request.setDefineModifierRequest(defineModifierRequest)

    return new Promise((resolve, reject) => {
      this._ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response = NiaProtocolJs.Response.deserializeBinary(message)

          if (response.hasDefineModifierResponse()) {
            const defineModifierResponse = response.getDefineModifierResponse()

            if (defineModifierResponse.hasSuccessResult()) {
              resolve()
            } else if (defineModifierResponse.hasErrorResult()) {
              reject()
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

  defineBinding(keyChords, action) {
    const requestKeyChords = makeKeyChords(keyChords)
    const requestAction = makeAction()

    const defineBindingRequest = new NiaProtocolJs.DefineBindingRequest()

    defineBindingRequest.setKeyChordsList(requestKeyChords)
    defineBindingRequest.setAction(requestAction)

    const request = new NiaProtocolJs.Request()
    request.setDefineBindingRequest(defineBindingRequest)

    return new Promise((resolve, reject) => {
      this._ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response = NiaProtocolJs.Response.deserializeBinary(message)

          if (response.hasDefineBindingResponse()) {
            const defineBindingResponse = response.getDefineBindingResponse()

            if (defineBindingResponse.hasSuccessResult()) {
              resolve()
            } else if (defineBindingResponse.hasErrorResult()) {
              reject()
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

  startListening() {
    const startListeningRequest = new NiaProtocolJs.StartListeningRequest()

    const request = new NiaProtocolJs.Request()
    request.setStartListeningRequest(startListeningRequest)

    return new Promise((resolve, reject) => {
      this._ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response = NiaProtocolJs.Response.deserializeBinary(message)

          if (response.hasStartListeningResponse()) {
            const startListeningResponse = response.getStartListeningResponse()

            if (startListeningResponse.hasSuccessResult()) {
              resolve()
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

  stopListening() {
    const stopListeningRequest = new NiaProtocolJs.StopListeningRequest()

    const request = new NiaProtocolJs.Request()
    request.setStopListeningRequest(stopListeningRequest)

    return new Promise((resolve, reject) => {
      this._ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response = NiaProtocolJs.Response.deserializeBinary(message)

          if (response.hasStopListeningResponse()) {
            const stopListeningResponse = response.getStopListeningResponse()

            if (stopListeningResponse.hasSuccessResult()) {
              resolve()
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
}