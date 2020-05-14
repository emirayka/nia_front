import WebSocket from 'ws'

import {InvalidResponseError} from '@/utils/error'

import {
  NiaDefineDeviceRequest,
  NiaDefineModifierRequest,
  NiaDefineModifierResponse,
  NiaExecuteCodeRequest,
  NiaExecuteCodeResponse,
  NiaGetDefinedModifiersRequest,
  NiaGetDefinedModifiersResponse,
  NiaGetDevicesRequest,
  NiaGetDevicesResponse,
  NiaHandshakeRequest,
  NiaHandshakeResponse,
  NiaRemoveDeviceByNameRequest,
  NiaRemoveDeviceByPathRequest,
  NiaRemoveModifierRequest,
  NiaRemoveModifierResponse,
} from '@/utils/protocol'
import {NiaResponse, NiaResponseType} from '@/utils/protocol/response'
import {NiaDefineDeviceResponse} from '@/utils/protocol/responses/define-device-response'
import {NiaRemoveDeviceByPathResponse} from '@/utils/protocol/responses/remove-device-by-path-response'
import {NiaRemoveDeviceByNameResponse} from '@/utils/protocol/responses/remove-device-by-name-response'

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

  handshake(): Promise<NiaHandshakeResponse> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: NiaResponse = NiaResponse.fromUint8Array(message)

          if (response.getResponseType() === NiaResponseType.Handshake) {
            resolve(response.getResponse() as NiaHandshakeResponse)
          } else {
            reject(new InvalidResponseError('Expected Handshake Response.'))
          }

        } else {
          reject(new InvalidResponseError('Got text message instead of binary'))
        }
      })

      const request: NiaHandshakeRequest = new NiaHandshakeRequest()
      const data: Uint8Array = request.toPB().serializeBinary()
      this.ws.send(data)
    })
  }

  getDevices(): Promise<NiaGetDevicesResponse> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: NiaResponse = NiaResponse.fromUint8Array(message)

          if (response.getResponseType() == NiaResponseType.GetDevices) {
            resolve(response.getResponse() as NiaGetDevicesResponse)
          } else {
            reject(new InvalidResponseError('Expected Get Devices response.'))
          }
        } else {
          reject(new InvalidResponseError('Got text message instead of binary'))
        }
      })

      const request: NiaGetDevicesRequest = new NiaGetDevicesRequest()
      const data: Uint8Array = request.toRequest().toUint8Array()
      this.ws.send(data)
    })
  }

  executeCode(code: string): Promise<NiaExecuteCodeResponse> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: NiaResponse = NiaResponse.fromUint8Array(message)

          if (response.getResponseType() == NiaResponseType.ExecuteCode) {
            resolve(response.getResponse() as NiaExecuteCodeResponse)
          } else {
            reject(new InvalidResponseError('Expected Execute Code response.'))
          }
        } else {
          reject()
        }
      })

      const request: NiaExecuteCodeRequest = new NiaExecuteCodeRequest(code)
      const data: Uint8Array = request.toPB().serializeBinary()

      this.ws.send(data)
    })
  }

  defineDevice(keyboardId: number): Promise<NiaDefineDeviceResponse> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: NiaResponse = NiaResponse.fromUint8Array(message)

          if (response.getResponseType() == NiaResponseType.DefineDevice) {
            resolve(response.getResponse() as NiaDefineDeviceResponse)
          } else {
            reject(new InvalidResponseError('Expected Define Device response.'))
          }
        } else {
          reject()
        }
      })

      const request: NiaDefineDeviceRequest = new NiaDefineDeviceRequest(keyboardId)
      const data: Uint8Array = request.toPB().serializeBinary()

      this.ws.send(data)
    })
  }

  removeDeviceByPath(keyboardPath: string): Promise<NiaRemoveDeviceByPathResponse> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: NiaResponse = NiaResponse.fromUint8Array(message)

          if (response.getResponseType() == NiaResponseType.RemoveDeviceByPath) {
            resolve(response.getResponse() as NiaRemoveDeviceByPathResponse)
          } else {
            reject(new InvalidResponseError('Expected Remove Device By Path response.'))
          }
        } else {
          reject()
        }
      })

      const request: NiaRemoveDeviceByPathRequest = new NiaRemoveDeviceByPathRequest(keyboardPath)
      const data: Uint8Array = request.toPB().serializeBinary()

      this.ws.send(data)
    })
  }

  removeDeviceByName(keyboardName: string): Promise<NiaRemoveDeviceByNameResponse> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: NiaResponse = NiaResponse.fromUint8Array(message)

          if (response.getResponseType() == NiaResponseType.RemoveDeviceByName) {
            resolve(response.getResponse() as NiaRemoveDeviceByNameResponse)
          } else {
            reject(new InvalidResponseError('Expected Remove Device By Name response.'))
          }
        } else {
          reject()
        }
      })

      const request: NiaRemoveDeviceByNameRequest = new NiaRemoveDeviceByNameRequest(keyboardName)
      const data: Uint8Array = request.toPB().serializeBinary()

      this.ws.send(data)
    })
  }

  getDefinedModifiers(): Promise<NiaGetDefinedModifiersResponse> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: NiaResponse = NiaResponse.fromUint8Array(message)

          if (response.getResponseType() == NiaResponseType.GetDefinedModifiers) {
            resolve(response.getResponse() as NiaGetDefinedModifiersResponse)
          } else {
            reject(new InvalidResponseError('Expected Get Defined Modifiers response.'))
          }
        } else {
          reject()
        }
      })

      const request: NiaGetDefinedModifiersRequest = new NiaGetDefinedModifiersRequest()
      const data: Uint8Array = request.toPB().serializeBinary()

      this.ws.send(data)
    })
  }

  defineModifier(keyboardId: number, keyCode: number, modifierAlias: string): Promise<NiaDefineModifierResponse> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: NiaResponse = NiaResponse.fromUint8Array(message)

          if (response.getResponseType() == NiaResponseType.DefineModifier) {
            resolve(response.getResponse() as NiaDefineModifierResponse)
          } else {
            reject(new InvalidResponseError('Expected Define Modifier response.'))
          }
        } else {
          reject()
        }
      })

      const request: NiaDefineModifierRequest = new NiaDefineModifierRequest(
        keyboardId,
        keyCode,
        modifierAlias,
      )
      const data: Uint8Array = request.toPB().serializeBinary()

      this.ws.send(data)
    })
  }

  async removeModifier(keyboardId: number, keyCode: number): Promise<NiaRemoveModifierResponse> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: NiaResponse = NiaResponse.fromUint8Array(message)

          if (response.getResponseType() == NiaResponseType.RemoveModifier) {
            resolve(response.getResponse() as NiaRemoveModifierResponse)
          } else {
            reject(new InvalidResponseError('Expected Remove Modifier response.'))
          }
        } else {
          reject()
        }
      })

      const request: NiaRemoveModifierRequest = new NiaRemoveModifierRequest(
        keyboardId,
        keyCode,
      )
      const data: Uint8Array = request.toPB().serializeBinary()

      this.ws.send(data)
      console.log('Sent remove modifier request')
    })
  }
}