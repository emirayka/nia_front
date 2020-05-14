import {
  DefineDeviceRequest, DefineModifierRequest,
  ExecuteCodeRequest,
  GetDefinedModifiersRequest,
  GetDevicesRequest,
  HandshakeRequest, RemoveDeviceByNameRequest, RemoveDeviceByPathRequest, RemoveModifierRequest,
  Request,
} from 'nia-protocol-js'

import {
  NiaHandshakeRequest,
  NiaGetDevicesRequest,
  NiaGetDefinedModifiersRequest,
  NiaExecuteCodeRequest,
  NiaDefineDeviceRequest,
  NiaRemoveDeviceByNameRequest,
  NiaRemoveDeviceByPathRequest,
  NiaDefineModifierRequest,
  NiaRemoveModifierRequest,
} from './requests'
import {SerializablePB} from '@/utils'

export type NiaRequestUnderlyingType = NiaHandshakeRequest |
  NiaGetDevicesRequest |
  NiaGetDefinedModifiersRequest |
  NiaExecuteCodeRequest |
  NiaDefineDeviceRequest |
  NiaRemoveDeviceByNameRequest |
  NiaRemoveDeviceByPathRequest |
  NiaDefineModifierRequest |
  NiaRemoveModifierRequest

export enum NiaRequestType {
  Handshake,
  GetDevices,
  GetDefinedModifiers,
  ExecuteCode,
  DefineDevice,
  RemoveDeviceByName,
  RemoveDeviceByPath,
  DefineModifier,
  RemoveModifier,
}

export class NiaRequest implements SerializablePB<NiaRequest, Request> {
  private readonly requestType: NiaRequestType
  private readonly request: NiaRequestUnderlyingType

  constructor(request: NiaRequestUnderlyingType) {
    this.requestType = request.getType()
    this.request = request
  }

  getRequestType(): NiaRequestType {
    return this.requestType
  }

  getRequest(): NiaRequestUnderlyingType {
    return this.request
  }

  toPB(): Request {
    let request: Request = new Request()

    switch (this.requestType) {
      case NiaRequestType.Handshake:
        const handshakeRequest: NiaHandshakeRequest = this.request as NiaHandshakeRequest
        const handshakeRequestPB: HandshakeRequest = handshakeRequest.toPB()

        request.setHandshakeRequest(handshakeRequestPB)

      case NiaRequestType.GetDevices:
        const getDevicesRequest: NiaGetDevicesRequest = this.request as NiaGetDevicesRequest
        const getDevicesRequestPB: GetDevicesRequest = getDevicesRequest.toPB()

        request.setGetDevicesRequest(getDevicesRequestPB)

      case NiaRequestType.GetDefinedModifiers:
        const getDefinedModifiersRequest: NiaGetDefinedModifiersRequest = this.request as NiaGetDefinedModifiersRequest
        const getDefinedModifiersRequestPB: GetDefinedModifiersRequest = getDefinedModifiersRequest.toPB()

        request.setGetDefinedModifiersRequest(getDefinedModifiersRequestPB)

      case NiaRequestType.ExecuteCode:
        const executeCodeRequest: NiaExecuteCodeRequest = this.request as NiaExecuteCodeRequest
        const executeCodeRequestPB: ExecuteCodeRequest = executeCodeRequest.toPB()

        request.setExecuteCodeRequest(executeCodeRequestPB)

      case NiaRequestType.DefineDevice:
        const defineDeviceRequest: NiaDefineDeviceRequest = this.request as NiaDefineDeviceRequest
        const defineDeviceRequestPB: DefineDeviceRequest = defineDeviceRequest.toPB()

        request.setDefineDeviceRequest(defineDeviceRequestPB)

      case NiaRequestType.RemoveDeviceByName:
        const removeDeviceByNameRequest: NiaRemoveDeviceByNameRequest = this.request as NiaRemoveDeviceByNameRequest
        const removeDeviceByNameRequestPB: RemoveDeviceByNameRequest = removeDeviceByNameRequest.toPB()

        request.setRemoveDeviceByNameRequest(removeDeviceByNameRequestPB)

      case NiaRequestType.RemoveDeviceByPath:
        const removeDeviceByPathRequest: NiaRemoveDeviceByPathRequest = this.request as NiaRemoveDeviceByPathRequest
        const removeDeviceByPathRequestPB: RemoveDeviceByPathRequest = removeDeviceByPathRequest.toPB()

        request.setRemoveDeviceByPathRequest(removeDeviceByPathRequestPB)

      case NiaRequestType.DefineModifier:
        const defineModifierRequest: NiaDefineModifierRequest = this.request as NiaDefineModifierRequest
        const defineModifierRequestPB: DefineModifierRequest = defineModifierRequest.toPB()

        request.setDefineModifierRequest(defineModifierRequestPB)

      case NiaRequestType.RemoveModifier:
        const removeModifierRequest: NiaRemoveModifierRequest = this.request as NiaRemoveModifierRequest
        const removeModifierRequestPB: RemoveModifierRequest = removeModifierRequest.toPB()

        request.setRemoveModifierRequest(removeModifierRequestPB)

      default:
        throw new Error('Unknown request to cast.')
    }

    return request
  }

  toUint8Array(): Uint8Array {
    let request: Request = this.toPB()

    return request.serializeBinary()
  }
}

