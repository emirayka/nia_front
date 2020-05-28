import WebSocket from 'ws'

import loggers from '@/utils/logger'
const logger = loggers('protocol')

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
  NiaRequest,
  NiaResponse,
  NiaResponseType,
  NiaDefineDeviceResponse,
  NiaRemoveDeviceByPathResponse,
  NiaRemoveDeviceByNameResponse,
  NiaAction,
  NiaKey,
  NiaGetDefinedActionsResponse,
  NiaDefineActionResponse,
  NiaGetDefinedActionsRequest,
  NiaDefineActionRequest,
  NiaRemoveActionResponse,
  NiaRemoveActionRequest,
  NiaGetDefinedMappingsResponse,
  NiaGetDefinedMappingsRequest,
  NiaMapping,
  NiaDefineMappingResponse,
  NiaDefineMappingRequest,
  NiaRemoveMappingResponse,
  NiaRemoveMappingRequest,
  NiaKeyChord,
  NiaModifierDescription,
} from '@/utils'

import {NiaChangeMappingRequest} from '@/utils/protocol/requests/change-mapping-request'
import {NiaChangeMappingResponse} from '@/utils/protocol/responses/change-mapping-response'
import {NiaStartListeningResponse} from '@/utils/protocol/responses/start-listening-response'
import {NiaStartListeningRequest} from '@/utils/protocol/requests/start-listening-request'
import {NiaStopListeningRequest} from '@/utils/protocol/requests/stop-listening-request'
import {NiaStopListeningResponse} from '@/utils/protocol/responses/stop-listening-response'
import {NiaNamedAction} from '@/utils/domain/action/named-action'

import {NiaIsListeningResponse} from '@/utils/protocol/responses/is-listening-response'
import {NiaIsListeningRequest} from '@/utils/protocol/requests/is-listening-request'


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

  defineDevice(deviceId: number): Promise<NiaDefineDeviceResponse> {
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

      const request: NiaRequest = new NiaDefineDeviceRequest(deviceId).toRequest()
      const data: Uint8Array = request.toUint8Array()

      this.ws.send(data)
    })
  }

  removeDeviceByPath(devicePath: string): Promise<NiaRemoveDeviceByPathResponse> {
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

      const request: NiaRequest = new NiaRemoveDeviceByPathRequest(devicePath).toRequest()
      const data: Uint8Array = request.toUint8Array()

      this.ws.send(data)
    })
  }

  removeDeviceByName(deviceName: string): Promise<NiaRemoveDeviceByNameResponse> {
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

      const request: NiaRequest = new NiaRemoveDeviceByNameRequest(deviceName).toRequest()
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

  defineModifier(modifierDescription: NiaModifierDescription): Promise<NiaDefineModifierResponse> {
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

      logger.debug('Need to send define modifier')
      logger.debug(modifierDescription)
      logger.debug('Constructing request..')
      const request: NiaRequest = new NiaDefineModifierRequest(modifierDescription).toRequest()
      logger.debug('Constructed:')
      logger.debug(request)

      logger.debug('Serializing...')
      const data: Uint8Array = request.toUint8Array()

      logger.debug('Sending define modifier request...')
      this.ws.send(data)
      logger.debug('Sent.')
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

      const request: NiaRequest = new NiaRemoveModifierRequest(key).toRequest()
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

  async defineAction(namedAction: NiaNamedAction): Promise<NiaDefineActionResponse> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          logger.debug('Got response. Deserializing...')
          const response: NiaResponse = NiaResponse.fromUint8Array(message)

          logger.debug('Checking type.')
          if (response.getResponseType() == NiaResponseType.DefineAction) {
            logger.debug('Response is define action response. Resolving...')
            resolve(response.getResponse() as NiaDefineActionResponse)
          } else {
            reject(new InvalidResponseError('Expected Define Action response.'))
          }
        } else {
          reject()
        }
      })

      logger.debug('Constructing define action request...')
      const request: NiaRequest = new NiaDefineActionRequest(namedAction).toRequest()

      logger.debug('Serializing define action request...')
      const data: Uint8Array = request.toUint8Array()

      logger.debug('Sending request...')
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

  async getDefinedMappings(): Promise<NiaGetDefinedMappingsResponse> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          logger.debug('Got GetDefinedMappings response. Deserializing...')
          const response: NiaResponse = NiaResponse.fromUint8Array(message)
          logger.debug('Success.')

          if (response.getResponseType() == NiaResponseType.GetDefinedMappings) {
            resolve(response.getResponse() as NiaGetDefinedMappingsResponse)
          } else {
            reject(new InvalidResponseError('Expected Get Defined Mappings response.'))
          }
        } else {
          reject()
        }
      })

      logger.debug('Construction GetDefinedMappings request...')
      const request: NiaRequest = new NiaGetDefinedMappingsRequest().toRequest()
      logger.debug('Success.')

      logger.debug('Constructing binary message...')
      const data: Uint8Array = request.toUint8Array()
      logger.debug('Success.')

      logger.debug('Sent GetDefinedMappings request')
      this.ws.send(data)
    })
  }

  async defineMapping(mapping: NiaMapping): Promise<NiaDefineMappingResponse> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          logger.debug('Got response. Deserializing...')
          const response: NiaResponse = NiaResponse.fromUint8Array(message)

          logger.debug('Checking type.')
          if (response.getResponseType() == NiaResponseType.DefineMapping) {
            logger.debug('Response is define mapping response. Resolving...')
            resolve(response.getResponse() as NiaDefineMappingResponse)
          } else {
            reject(new InvalidResponseError('Expected Define Mapping response.'))
          }
        } else {
          reject()
        }
      })

      logger.debug('Constructing define mapping request...')
      const request: NiaRequest = new NiaDefineMappingRequest(mapping).toRequest()

      logger.debug('Serializing define mapping request...')
      const data: Uint8Array = request.toUint8Array()

      logger.debug('Sending request...')
      this.ws.send(data)
    })
  }

  async changeMapping(keyChords: Array<NiaKeyChord>, action: NiaAction): Promise<NiaChangeMappingResponse> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          logger.debug('Got response. Deserializing...')
          const response: NiaResponse = NiaResponse.fromUint8Array(message)

          logger.debug('Checking type...')
          if (response.getResponseType() == NiaResponseType.ChangeMapping) {
            logger.debug('Response is change mapping response. Resolving...')
            resolve(response.getResponse() as NiaChangeMappingResponse)
          } else {
            reject(new InvalidResponseError('Expected Change Mapping response.'))
          }
        } else {
          reject()
        }
      })

      logger.debug('Constructing change mapping request...')
      const request: NiaRequest = new NiaChangeMappingRequest(keyChords, action).toRequest()

      logger.debug('Serializing change mapping request...')
      const data: Uint8Array = request.toUint8Array()

      logger.debug('Sending request...')
      this.ws.send(data)
    })
  }

  async removeMapping(keyChords: Array<NiaKeyChord>): Promise<NiaRemoveMappingResponse> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: NiaResponse = NiaResponse.fromUint8Array(message)

          if (response.getResponseType() == NiaResponseType.RemoveMapping) {
            resolve(response.getResponse() as NiaRemoveMappingResponse)
          } else {
            reject(new InvalidResponseError('Expected Remove Mapping response.'))
          }
        } else {
          reject()
        }
      })

      const request: NiaRequest = new NiaRemoveMappingRequest(keyChords).toRequest()
      const data: Uint8Array = request.toUint8Array()

      this.ws.send(data)
    })
  }

  async isListening(): Promise<NiaIsListeningResponse> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: NiaResponse = NiaResponse.fromUint8Array(message)

          if (response.getResponseType() == NiaResponseType.IsListening) {
            resolve(response.getResponse() as NiaIsListeningResponse)
          } else {
            reject(new InvalidResponseError('Expected Is Listening response.'))
          }
        } else {
          reject()
        }
      })

      const request: NiaRequest = new NiaIsListeningRequest().toRequest()
      const data: Uint8Array = request.toUint8Array()

      this.ws.send(data)
    })
  }

  async startListening(): Promise<NiaStartListeningResponse> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: NiaResponse = NiaResponse.fromUint8Array(message)

          if (response.getResponseType() == NiaResponseType.StartListening) {
            resolve(response.getResponse() as NiaStartListeningResponse)
          } else {
            reject(new InvalidResponseError('Expected Start Listening response.'))
          }
        } else {
          reject()
        }
      })

      const request: NiaRequest = new NiaStartListeningRequest().toRequest()
      const data: Uint8Array = request.toUint8Array()

      this.ws.send(data)
    })
  }

  async stopListening(): Promise<NiaStopListeningResponse> {
    return new Promise((resolve, reject) => {
      this.ws.once('message', message => {
        if (message instanceof Uint8Array) {
          const response: NiaResponse = NiaResponse.fromUint8Array(message)

          if (response.getResponseType() == NiaResponseType.StopListening) {
            resolve(response.getResponse() as NiaStopListeningResponse)
          } else {
            reject(new InvalidResponseError('Expected Stop Listening response.'))
          }
        } else {
          reject()
        }
      })

      const request: NiaRequest = new NiaStopListeningRequest().toRequest()
      const data: Uint8Array = request.toUint8Array()

      this.ws.send(data)
    })
  }
}