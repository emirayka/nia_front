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
  NiaRemoveModifierResponse, NiaRequest,
} from '@/utils/protocol'
import {NiaResponse, NiaResponseType} from '@/utils/protocol/response'
import {NiaDefineDeviceResponse} from '@/utils/protocol/responses/define-device-response'
import {NiaRemoveDeviceByPathResponse} from '@/utils/protocol/responses/remove-device-by-path-response'
import {NiaRemoveDeviceByNameResponse} from '@/utils/protocol/responses/remove-device-by-name-response'
import {NiaAction, NiaKey} from '@/utils'
import {NiaGetDefinedActionsResponse} from '@/utils/protocol/responses/get-defined-actions-request'
import {NiaDefineActionResponse} from '@/utils/protocol/responses/define-action-response'
import {NiaGetDefinedActionsRequest} from '@/utils/protocol/requests/get-defined-actions-request'
import {NiaDefineActionRequest} from '@/utils/protocol/requests/define-action-request'
import {NiaRemoveActionResponse} from '@/utils/protocol/responses/remove-action-response'
import {NiaRemoveActionRequest} from '@/utils/protocol/requests/remove-action-request'

export class NiaProtocol {
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

      const request: NiaRequest = new NiaHandshakeRequest().toRequest()
      const data: Uint8Array = request.toUint8Array()

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

      const request: NiaRequest = new NiaGetDevicesRequest().toRequest()
      const data: Uint8Array = request.toUint8Array()
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

      const request: NiaRequest = new NiaExecuteCodeRequest(code).toRequest()
      const data: Uint8Array = request.toUint8Array()

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

      const request: NiaRequest = new NiaDefineDeviceRequest(keyboardId).toRequest()
      const data: Uint8Array = request.toUint8Array()

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

      const request: NiaRequest = new NiaRemoveDeviceByPathRequest(keyboardPath).toRequest()
      const data: Uint8Array = request.toUint8Array()

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

      const request: NiaRequest = new NiaRemoveDeviceByNameRequest(keyboardName).toRequest()
      const data: Uint8Array = request.toUint8Array()

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

      const request: NiaRequest = new NiaGetDefinedModifiersRequest().toRequest()
      const data: Uint8Array = request.toUint8Array()

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

      const request: NiaRequest = new NiaDefineModifierRequest(
        keyboardId,
        keyCode,
        modifierAlias,
      ).toRequest()
      const data: Uint8Array = request.toUint8Array()

      this.ws.send(data)
    })
  }

  async removeModifier(key: NiaKey): Promise<NiaRemoveModifierResponse> {
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

      const deviceId: number | null = key.getDeviceId()
      const keyCode: number = key.getKeyCode()

      if (deviceId === null) {
        reject('Device is is not set')
        return
      }

      const request: NiaRequest = new NiaRemoveModifierRequest(
        deviceId,
        keyCode
      ).toRequest()
      const data: Uint8Array = request.toUint8Array()

      this.ws.send(data)
    })
  }

  async getDefinedActions(): Promise<NiaGetDefinedActionsResponse> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: NiaResponse = NiaResponse.fromUint8Array(message)

          if (response.getResponseType() == NiaResponseType.GetDefinedActions) {
            resolve(response.getResponse() as NiaGetDefinedActionsResponse)
          } else {
            reject(new InvalidResponseError('Expected Get Defined Actions response.'))
          }
        } else {
          reject()
        }
      })

      const request: NiaRequest = new NiaGetDefinedActionsRequest().toRequest()
      const data: Uint8Array = request.toUint8Array()

      this.ws.send(data)
    })
  }

  async defineAction(action: NiaAction): Promise<NiaDefineActionResponse> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: NiaResponse = NiaResponse.fromUint8Array(message)

          if (response.getResponseType() == NiaResponseType.DefineAction) {
            resolve(response.getResponse() as NiaDefineActionResponse)
          } else {
            reject(new InvalidResponseError('Expected Define Action response.'))
          }
        } else {
          reject()
        }
      })

      const request: NiaRequest = new NiaDefineActionRequest(action).toRequest()
      const data: Uint8Array = request.toUint8Array()

      this.ws.send(data)
    })
  }

  async removeAction(actionName: string): Promise<NiaRemoveActionResponse> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: NiaResponse = NiaResponse.fromUint8Array(message)

          if (response.getResponseType() == NiaResponseType.RemoveAction) {
            resolve(response.getResponse() as NiaRemoveActionResponse)
          } else {
            reject(new InvalidResponseError('Expected Remove Action response.'))
          }
        } else {
          reject()
        }
      })

      const request: NiaRequest = new NiaRemoveActionRequest(actionName).toRequest()
      const data: Uint8Array = request.toUint8Array()

      this.ws.send(data)
    })
  }
}