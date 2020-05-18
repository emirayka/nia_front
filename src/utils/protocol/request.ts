import {
  DefineActionRequest,
  DefineDeviceRequest, DefineModifierRequest,
  ExecuteCodeRequest, GetDefinedActionsRequest,
  GetDefinedModifiersRequest,
  GetDevicesRequest,
  HandshakeRequest, RemoveActionRequest, RemoveDeviceByNameRequest, RemoveDeviceByPathRequest, RemoveModifierRequest,
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
import {NiaGetDefinedActionsRequest} from '@/utils/protocol/requests/get-defined-actions-request'
import {NiaDefineActionRequest} from '@/utils/protocol/requests/define-action-request'
import {NiaRemoveActionRequest} from '@/utils/protocol/requests/remove-action-request'

export type NiaRequestUnderlyingType = NiaHandshakeRequest |
  NiaGetDevicesRequest |
  NiaGetDefinedModifiersRequest |
  NiaExecuteCodeRequest |
  NiaDefineDeviceRequest |
  NiaRemoveDeviceByNameRequest |
  NiaRemoveDeviceByPathRequest |
  NiaDefineModifierRequest |
  NiaRemoveModifierRequest |
  NiaGetDefinedActionsRequest |
  NiaDefineActionRequest |
  NiaRemoveActionRequest

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
  GetDefinedActions,
  DefineAction,
  RemoveAction,
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
        break

      case NiaRequestType.GetDevices:
        const getDevicesRequest: NiaGetDevicesRequest = this.request as NiaGetDevicesRequest
        const getDevicesRequestPB: GetDevicesRequest = getDevicesRequest.toPB()

        request.setGetDevicesRequest(getDevicesRequestPB)
        break

      case NiaRequestType.GetDefinedModifiers:
        const getDefinedModifiersRequest: NiaGetDefinedModifiersRequest = this.request as NiaGetDefinedModifiersRequest
        const getDefinedModifiersRequestPB: GetDefinedModifiersRequest = getDefinedModifiersRequest.toPB()

        request.setGetDefinedModifiersRequest(getDefinedModifiersRequestPB)
        break

      case NiaRequestType.ExecuteCode:
        const executeCodeRequest: NiaExecuteCodeRequest = this.request as NiaExecuteCodeRequest
        const executeCodeRequestPB: ExecuteCodeRequest = executeCodeRequest.toPB()

        request.setExecuteCodeRequest(executeCodeRequestPB)
        break

      case NiaRequestType.DefineDevice:
        const defineDeviceRequest: NiaDefineDeviceRequest = this.request as NiaDefineDeviceRequest
        const defineDeviceRequestPB: DefineDeviceRequest = defineDeviceRequest.toPB()

        request.setDefineDeviceRequest(defineDeviceRequestPB)
        break

      case NiaRequestType.RemoveDeviceByName:
        const removeDeviceByNameRequest: NiaRemoveDeviceByNameRequest = this.request as NiaRemoveDeviceByNameRequest
        const removeDeviceByNameRequestPB: RemoveDeviceByNameRequest = removeDeviceByNameRequest.toPB()

        request.setRemoveDeviceByNameRequest(removeDeviceByNameRequestPB)
        break

      case NiaRequestType.RemoveDeviceByPath:
        const removeDeviceByPathRequest: NiaRemoveDeviceByPathRequest = this.request as NiaRemoveDeviceByPathRequest
        const removeDeviceByPathRequestPB: RemoveDeviceByPathRequest = removeDeviceByPathRequest.toPB()

        request.setRemoveDeviceByPathRequest(removeDeviceByPathRequestPB)
        break

      case NiaRequestType.DefineModifier:
        const defineModifierRequest: NiaDefineModifierRequest = this.request as NiaDefineModifierRequest
        const defineModifierRequestPB: DefineModifierRequest = defineModifierRequest.toPB()

        request.setDefineModifierRequest(defineModifierRequestPB)
        break

      case NiaRequestType.RemoveModifier:
        const removeModifierRequest: NiaRemoveModifierRequest = this.request as NiaRemoveModifierRequest
        const removeModifierRequestPB: RemoveModifierRequest = removeModifierRequest.toPB()

        request.setRemoveModifierRequest(removeModifierRequestPB)
        break

      case NiaRequestType.GetDefinedActions:
        const getDefinedActionsRequest: NiaGetDefinedActionsRequest = this.request as NiaGetDefinedActionsRequest
        const getDefinedActionsRequestPB: GetDefinedActionsRequest = getDefinedActionsRequest.toPB()

        request.setGetDefinedActionsRequest(getDefinedActionsRequestPB)
        break

      case NiaRequestType.DefineAction:
        const defineActionRequest: NiaDefineActionRequest = this.request as NiaDefineActionRequest
        const defineActionRequestPB: DefineActionRequest = defineActionRequest.toPB()

        request.setDefineActionRequest(defineActionRequestPB)
        break

      case NiaRequestType.RemoveAction:
        const removeActionRequest: NiaRemoveActionRequest = this.request as NiaRemoveActionRequest
        const removeActionRequestPB: RemoveActionRequest = removeActionRequest.toPB()

        request.setRemoveActionRequest(removeActionRequestPB)
        break

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

