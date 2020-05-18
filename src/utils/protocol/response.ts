import {
  NiaDefineModifierResponse, NiaExecuteCodeResponse, NiaGetDefinedModifiersResponse, NiaGetDevicesResponse,
  NiaHandshakeResponse, NiaRemoveModifierResponse,
} from './responses'
import {NiaDefineDeviceResponse} from '@/utils/protocol/responses/define-device-response'
import {NiaRemoveDeviceByNameResponse} from '@/utils/protocol/responses/remove-device-by-name-response'
import {
  DefineActionResponse,
  DefineDeviceResponse,
  DefineModifierResponse,
  ExecuteCodeResponse, GetDefinedActionsResponse,
  GetDefinedModifiersResponse,
  GetDevicesResponse,
  HandshakeResponse, RemoveActionResponse,
  RemoveDeviceByNameResponse,
  RemoveDeviceByPathResponse, RemoveModifierResponse,
  Response,
} from 'nia-protocol-js'
import {NiaRemoveDeviceByPathResponse} from '@/utils/protocol/responses/remove-device-by-path-response'
import {NiaGetDefinedActionsResponse} from '@/utils/protocol/responses/get-defined-actions-request'
import {NiaDefineActionResponse} from '@/utils/protocol/responses/define-action-response'
import {NiaRemoveActionResponse} from '@/utils/protocol/responses/remove-action-response'

export type NiaResponseUnderlyingType = NiaDefineDeviceResponse |
  NiaDefineModifierResponse |
  NiaExecuteCodeResponse |
  NiaGetDefinedModifiersResponse |
  NiaGetDevicesResponse |
  NiaHandshakeResponse |
  NiaRemoveDeviceByNameResponse |
  NiaRemoveDeviceByPathResponse |
  NiaRemoveModifierResponse |
  NiaGetDefinedActionsResponse |
  NiaDefineActionResponse |
  NiaRemoveActionResponse

export enum NiaResponseType {
  DefineDevice,
  DefineModifier,
  ExecuteCode,
  GetDefinedModifiers,
  GetDevices,
  Handshake,
  RemoveDeviceByName,
  RemoveDeviceByPath,
  RemoveModifier,
  GetDefinedActions,
  DefineAction,
  RemoveAction,
}

export class NiaResponse {
  private readonly responseType: NiaResponseType
  private readonly response: NiaResponseUnderlyingType

  constructor(response: NiaResponseUnderlyingType) {
    this.response = response
    this.responseType = response.getType()
  }

  getResponseType(): NiaResponseType {
    return this.responseType
  }

  getResponse(): NiaResponseUnderlyingType {
    return this.response
  }

  static fromPB(responsePB: Response): NiaResponse {
    switch (responsePB.getResponseCase()) {
      case Response.ResponseCase.DEFINE_DEVICE_RESPONSE:
        const defineDeviceResponsePB: DefineDeviceResponse | undefined = responsePB.getDefineDeviceResponse()

        if (defineDeviceResponsePB === undefined) {
          throw new Error('DefineDeviceResponse was not set')
        }

        const defineDeviceResponse: NiaDefineDeviceResponse = NiaDefineDeviceResponse.fromPB(defineDeviceResponsePB)
        return new NiaResponse(defineDeviceResponse)

      case Response.ResponseCase.DEFINE_MODIFIER_RESPONSE:
        const defineModifierResponsePB: DefineModifierResponse | undefined = responsePB.getDefineModifierResponse()

        if (defineModifierResponsePB === undefined) {
          throw new Error('DefineModifierResponse was not set')
        }

        const defineModifierResponse: NiaDefineModifierResponse = NiaDefineModifierResponse.fromPB(defineModifierResponsePB)
        return new NiaResponse(defineModifierResponse)

      case Response.ResponseCase.EXECUTE_CODE_RESPONSE:
        const executeCodeResponsePB: ExecuteCodeResponse | undefined = responsePB.getExecuteCodeResponse()

        if (executeCodeResponsePB === undefined) {
          throw new Error('ExecuteCodeResponse was not set')
        }

        const executeCodeResponse: NiaExecuteCodeResponse = NiaExecuteCodeResponse.fromPB(executeCodeResponsePB)
        return new NiaResponse(executeCodeResponse)

      case Response.ResponseCase.GET_DEFINED_MODIFIERS_RESPONSE:
        const getDefinedModifiersResponsePB: GetDefinedModifiersResponse | undefined = responsePB.getGetDefinedModifiersResponse()

        if (getDefinedModifiersResponsePB === undefined) {
          throw new Error('GetDefinedModifiers was not set')
        }

        const getDefinedModifiersResponse: NiaGetDefinedModifiersResponse = NiaGetDefinedModifiersResponse.fromPB(getDefinedModifiersResponsePB)
        return new NiaResponse(getDefinedModifiersResponse)

      case Response.ResponseCase.GET_DEVICES_RESPONSE:
        const getDevicesResponsePB: GetDevicesResponse | undefined = responsePB.getGetDevicesResponse()

        if (getDevicesResponsePB === undefined) {
          throw new Error('GetDevicesResponse was not set')
        }

        const getDevicesResponse: NiaGetDevicesResponse = NiaGetDevicesResponse.fromPB(getDevicesResponsePB)
        return new NiaResponse(getDevicesResponse)

      case Response.ResponseCase.HANDSHAKE_RESPONSE:
        const handshakeResponsePB: HandshakeResponse | undefined = responsePB.getHandshakeResponse()

        if (handshakeResponsePB === undefined) {
          throw new Error('HandshakeResponse was not set')
        }

        const handshakeResponse: NiaHandshakeResponse = NiaHandshakeResponse.fromPB(handshakeResponsePB)
        return new NiaResponse(handshakeResponse)

      case Response.ResponseCase.REMOVE_DEVICE_BY_NAME_RESPONSE:
        const removeDeviceByNameResponsePB: RemoveDeviceByNameResponse | undefined = responsePB.getRemoveDeviceByNameResponse()

        if (removeDeviceByNameResponsePB === undefined) {
          throw new Error('RemoveDeviceByNameResponse was not set')
        }

        const removeDeviceByNameResponse: NiaRemoveDeviceByNameResponse = NiaRemoveDeviceByNameResponse.fromPB(removeDeviceByNameResponsePB)
        return new NiaResponse(removeDeviceByNameResponse)

      case Response.ResponseCase.REMOVE_DEVICE_BY_PATH_RESPONSE:
        const removeDeviceByPathResponsePB: RemoveDeviceByPathResponse | undefined = responsePB.getRemoveDeviceByPathResponse()

        if (removeDeviceByPathResponsePB === undefined) {
          throw new Error('RemoveDeviceByPathResponse was not set')
        }

        const removeDeviceByPathResponse: NiaRemoveDeviceByPathResponse = NiaRemoveDeviceByPathResponse.fromPB(removeDeviceByPathResponsePB)
        return new NiaResponse(removeDeviceByPathResponse)

      case Response.ResponseCase.REMOVE_MODIFIER_RESPONSE:
        const removeModifierResponsePB: RemoveModifierResponse | undefined = responsePB.getRemoveModifierResponse()

        if (removeModifierResponsePB === undefined) {
          throw new Error('RemoveModifierResponse was not set')
        }

        const removeModifierResponse: NiaRemoveModifierResponse = NiaRemoveModifierResponse.fromPB(removeModifierResponsePB)
        return new NiaResponse(removeModifierResponse)

      case Response.ResponseCase.GET_DEFINED_ACTIONS_RESPONSE:
        const getDefinedActionsResponsePB: GetDefinedActionsResponse | undefined = responsePB.getGetDefinedActionsResponse()

        if (getDefinedActionsResponsePB === undefined) {
          throw new Error('GetDefinedActionsResponse was not set')
        }

        const getDefinedActionsResponse: NiaGetDefinedActionsResponse = NiaGetDefinedActionsResponse.fromPB(getDefinedActionsResponsePB)
        return new NiaResponse(getDefinedActionsResponse)

      case Response.ResponseCase.DEFINE_ACTION_RESPONSE:
        const defineActionResponsePB: DefineActionResponse | undefined = responsePB.getDefineActionResponse()

        if (defineActionResponsePB === undefined) {
          throw new Error('DefineActionResponse was not set')
        }

        const defineActionResponse: NiaDefineActionResponse = NiaDefineActionResponse.fromPB(defineActionResponsePB)
        return new NiaResponse(defineActionResponse)

      case Response.ResponseCase.REMOVE_ACTION_RESPONSE:
        const removeActionResponsePB: RemoveActionResponse | undefined = responsePB.getRemoveActionResponse()

        if (removeActionResponsePB === undefined) {
          throw new Error('RemoveActionResponse was not set')
        }

        const removeActionResponse: NiaRemoveActionResponse = NiaRemoveActionResponse.fromPB(removeActionResponsePB)
        return new NiaResponse(removeActionResponse)

      default:
        throw new Error('Unknown response')
    }
  }

  static fromUint8Array(bytes: Uint8Array): NiaResponse {
    let response: Response = Response.deserializeBinary(bytes)

    return NiaResponse.fromPB(response)
  }
}