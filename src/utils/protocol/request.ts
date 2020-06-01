import {
  ChangeMappingRequest,
  DefineActionRequest,
  DefineDeviceRequest,
  DefineMappingRequest,
  DefineModifierRequest,
  ExecuteCodeRequest,
  GetDefinedActionsRequest,
  GetDefinedMappingsRequest,
  GetDefinedModifiersRequest,
  GetDevicesRequest,
  HandshakeRequest, IsListeningRequest,
  RemoveActionRequest, RemoveDeviceByIdRequest,
  RemoveDeviceByNameRequest,
  RemoveDeviceByPathRequest,
  RemoveMappingRequest,
  RemoveModifierRequest,
  Request, StartListeningRequest, StopListeningRequest,
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
  NiaRemoveModifierRequest, NiaGetDefinedMappingsRequest, NiaDefineMappingRequest, NiaRemoveMappingRequest,
} from './requests'
import {SerializablePB} from '@/utils'
import {NiaGetDefinedActionsRequest} from '@/utils/protocol/requests/get-defined-actions-request'
import {NiaDefineActionRequest} from '@/utils/protocol/requests/define-action-request'
import {NiaRemoveActionRequest} from '@/utils/protocol/requests/remove-action-request'
import {NiaChangeMappingRequest} from '@/utils/protocol/requests/change-mapping-request'
import {NiaStartListeningRequest} from '@/utils/protocol/requests/start-listening-request'
import {NiaStopListeningRequest} from '@/utils/protocol/requests/stop-listening-request'
import {NiaIsListeningRequest} from '@/utils/protocol/requests/is-listening-request'
import {NiaRemoveDeviceByIdRequest} from '@/utils/protocol/requests/remove-device-by-id-request'

export type NiaRequestUnderlyingType = NiaHandshakeRequest |
  NiaGetDevicesRequest |
  NiaGetDefinedModifiersRequest |
  NiaExecuteCodeRequest |
  NiaDefineDeviceRequest |
  NiaRemoveDeviceByNameRequest |
  NiaRemoveDeviceByPathRequest |
  NiaRemoveDeviceByIdRequest |
  NiaRemoveDeviceByIdRequest |
  NiaDefineModifierRequest |
  NiaRemoveModifierRequest |
  NiaGetDefinedActionsRequest |
  NiaDefineActionRequest |
  NiaRemoveActionRequest |
  NiaGetDefinedMappingsRequest |
  NiaDefineMappingRequest |
  NiaChangeMappingRequest |
  NiaRemoveMappingRequest |
  NiaIsListeningRequest |
  NiaStartListeningRequest |
  NiaStopListeningRequest

export enum NiaRequestType {
  Handshake,
  GetDevices,
  GetDefinedModifiers,
  ExecuteCode,
  DefineDevice,
  RemoveDeviceByName,
  RemoveDeviceByPath,
  RemoveDeviceById,
  DefineModifier,
  RemoveModifier,
  GetDefinedActions,
  DefineAction,
  RemoveAction,
  GetDefinedMappings,
  DefineMapping,
  ChangeMapping,
  RemoveMapping,
  IsListening,
  StartListening,
  StopListening,
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

      case NiaRequestType.RemoveDeviceById:
        const removeDeviceByIdRequest: NiaRemoveDeviceByIdRequest = this.request as NiaRemoveDeviceByIdRequest
        const removeDeviceByIdRequestPB: RemoveDeviceByIdRequest = removeDeviceByIdRequest.toPB()

        request.setRemoveDeviceByIdRequest(removeDeviceByIdRequestPB)
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

      case NiaRequestType.GetDefinedMappings:
        const getDefinedMappingsRequest: NiaGetDefinedMappingsRequest = this.request as NiaGetDefinedMappingsRequest
        const getDefinedMappingsRequestPB: GetDefinedMappingsRequest = getDefinedMappingsRequest.toPB()

        request.setGetDefinedMappingsRequest(getDefinedMappingsRequestPB)
        break

      case NiaRequestType.DefineMapping:
        const defineMappingRequest: NiaDefineMappingRequest = this.request as NiaDefineMappingRequest
        const defineMappingRequestPB: DefineMappingRequest = defineMappingRequest.toPB()

        request.setDefineMappingRequest(defineMappingRequestPB)
        break

      case NiaRequestType.ChangeMapping:
        const changeMappingRequest: NiaChangeMappingRequest = this.request as NiaChangeMappingRequest
        const changeMappingRequestPB: ChangeMappingRequest = changeMappingRequest.toPB()

        request.setChangeMappingRequest(changeMappingRequestPB)
        break

      case NiaRequestType.RemoveMapping:
        const removeMappingRequest: NiaRemoveMappingRequest = this.request as NiaRemoveMappingRequest
        const removeMappingRequestPB: RemoveMappingRequest = removeMappingRequest.toPB()

        request.setRemoveMappingRequest(removeMappingRequestPB)
        break

      case NiaRequestType.IsListening:
        const isListeningRequest: NiaIsListeningRequest = this.request as NiaIsListeningRequest
        const isListeningRequestPB: IsListeningRequest = isListeningRequest.toPB()

        request.setIsListeningRequest(isListeningRequestPB)
        break

      case NiaRequestType.StartListening:
        const startListeningRequest: NiaStartListeningRequest = this.request as NiaStartListeningRequest
        const startListeningRequestPB: StartListeningRequest = startListeningRequest.toPB()

        request.setStartListeningRequest(startListeningRequestPB)
        break

      case NiaRequestType.StopListening:
        const stopListeningRequest: NiaStopListeningRequest = this.request as NiaStopListeningRequest
        const stopListeningRequestPB: StopListeningRequest = stopListeningRequest.toPB()

        request.setStopListeningRequest(stopListeningRequestPB)
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

