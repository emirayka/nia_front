import WebSocket from 'ws'
import {err, ok, Result} from 'neverthrow'

import {InvalidResponseError} from '@/background-utils/error'

import {
  NiaExecuteCodeResult,
  NiaGetDeviceInfoResult,
  NiaGetDevicesResult,
  NiaHandshakeResult,

  NiaExecuteCodeRequest,
  NiaGetDeviceInfoRequest,
  NiaGetDevicesRequest,
  NiaHandshakeRequest,

  NiaExecuteCodeResponse,
  NiaGetDeviceInfoResponse,
  NiaGetDevicesResponse,
  NiaHandshakeResponse,
  NiaDefineKeyboardRequest,
  NiaDefineKeyboardResponse,
  NiaDefineKeyboardResult,
  NiaRemoveKeyboardByPathRequest,
  NiaRemoveKeyboardByPathResponse,
  NiaRemoveKeyboardByPathResult,
  NiaRemoveKeyboardByNameResult, NiaRemoveKeyboardByNameResponse, NiaRemoveKeyboardByNameRequest,
} from '@/background-utils/protocol'
import NiaDefineModifierRequest from '@/background-utils/protocol/request/define-modifier-request'

export default class {
  private port: number
  private ws: WebSocket
  private ready: boolean

  constructor(port: number) {
    this.port = port
    this.ws = new WebSocket(`ws://127.0.0.1:${port}`)
    this.ready = false

    this.ws.once('open', () => {
      this.ready = true
    })
  }

  isReady(): Promise<void> {
    if (this.ready) {
      return Promise.resolve()
    } else {
      return new Promise((resolve) => {
        this.ws.once('open', () => {
          resolve()
        })
      })
    }
  }

  handshake(): Promise<NiaHandshakeResult> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: Result<NiaHandshakeResponse, InvalidResponseError> = NiaHandshakeResponse.fromUInt8Array(message)

          response.andThen((response) => response.toResult())
            .match(resolve, reject)
        } else {
          reject(new InvalidResponseError('Got text message instead of binary'))
        }
      })

      const request: NiaHandshakeRequest = new NiaHandshakeRequest()
      const data: Uint8Array = request.toRequest().serializeBinary()
      this.ws.send(data)
    })
  }

  getDevices(): Promise<NiaGetDevicesResult> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: Result<NiaGetDevicesResponse, InvalidResponseError> = NiaGetDevicesResponse.fromUInt8Array(message)

          response.andThen((response) => response.toResult())
            .match(resolve, reject)
        } else {
          reject(new InvalidResponseError('Got text message instead of binary'))
        }
      })

      const request: NiaGetDevicesRequest = new NiaGetDevicesRequest()
      const data: Uint8Array = request.toResponse().serializeBinary()
      this.ws.send(data)
    })
  }

  getDeviceInfo(devicePath: string): Promise<NiaGetDeviceInfoResult> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: Result<NiaGetDeviceInfoResponse, InvalidResponseError> = NiaGetDeviceInfoResponse.fromUInt8Array(message)

          response.andThen(response => response.toResult())
            .match(resolve, reject)
        } else {
          reject()
        }
      })

      const request = new NiaGetDeviceInfoRequest(devicePath)
      const data: Uint8Array = request.to_request().serializeBinary()
      this.ws.send(data)
    })
  }

  async getMultipleDeviceInfo(getDevicesResponse: NiaGetDevicesResult): Promise<Array<NiaGetDeviceInfoResult>> {
    const devices: Array<string> = getDevicesResponse.devices;
    const devicesInfo: Array<NiaGetDeviceInfoResult> = []

    for (let device of devices) {
      const result: NiaGetDeviceInfoResult = await this.getDeviceInfo(device)
      devicesInfo.push(result)
    }

    return devicesInfo
  }

  executeCode(code: string): Promise<NiaExecuteCodeResult> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: Result<NiaExecuteCodeResponse, InvalidResponseError> = NiaExecuteCodeResponse.fromUInt8Array(message)

          response.andThen((response) => response.toResult())
            .match(resolve, reject)
        } else {
          reject()
        }
      })

      const request: NiaExecuteCodeRequest = new NiaExecuteCodeRequest(code)
      const data: Uint8Array = request.toRequest().serializeBinary()

      this.ws.send(data)
    })
  }

  defineKeyboard(keyboardPath: string, keyboardName: string): Promise<NiaDefineKeyboardResult> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: Result<NiaDefineKeyboardResponse, InvalidResponseError> = NiaDefineKeyboardResponse.fromUInt8Array(message)

          response.andThen((response) => response.toResult())
            .match(resolve, reject)
        } else {
          reject()
        }
      })

      const request: NiaDefineKeyboardRequest = new NiaDefineKeyboardRequest(keyboardPath, keyboardName)
      const data: Uint8Array = request.toRequest().serializeBinary()

      this.ws.send(data)
    })
  }

  removeKeyboardByPath(keyboardPath: string): Promise<NiaRemoveKeyboardByPathResult> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: Result<NiaRemoveKeyboardByPathResponse, InvalidResponseError> = NiaRemoveKeyboardByPathResponse.fromUInt8Array(message)

          response.andThen((response) => response.toResult())
            .match(resolve, reject)
        } else {
          reject()
        }
      })

      const request: NiaRemoveKeyboardByPathRequest = new NiaRemoveKeyboardByPathRequest(keyboardPath)
      const data: Uint8Array = request.toRequest().serializeBinary()

      this.ws.send(data)
    })
  }

  removeKeyboardByName(keyboardName: string): Promise<NiaRemoveKeyboardByNameResult> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: Result<NiaRemoveKeyboardByNameResponse, InvalidResponseError> = NiaRemoveKeyboardByNameResponse.fromUInt8Array(message)

          response.andThen((response) => response.toResult())
            .match(resolve, reject)
        } else {
          reject()
        }
      })

      const request: NiaRemoveKeyboardByNameRequest = new NiaRemoveKeyboardByNameRequest(keyboardName)
      const data: Uint8Array = request.toRequest().serializeBinary()

      this.ws.send(data)
    })
  }

  addModifier(keyboardPath: string, keyCode: number, modifierAlias: string): Promise<NiaRemoveKeyboardByNameResult> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: Result<NiaRemoveKeyboardByNameResponse, InvalidResponseError> = NiaRemoveKeyboardByNameResponse.fromUInt8Array(message)

          response.andThen((response) => response.toResult())
            .match(resolve, reject)
        } else {
          reject()
        }
      })

      const request: NiaDefineModifierRequest = new NiaDefineModifierRequest(keyboardPath, keyCode)
      const data: Uint8Array = request.toRequest().serializeBinary()

      this.ws.send(data)
    })
  }
}