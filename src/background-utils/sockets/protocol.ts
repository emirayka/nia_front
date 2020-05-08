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
} from '@/background-utils/protocol'

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

  is_ready(): Promise<void> {
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
}