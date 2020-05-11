import NiaDefineKeyboardEventResponse from '@/utils/event/response/define-keyboard-event-response'
import NiaDefineModifierEventResponse from '@/utils/event/response/define-modifier-event-response'
import NiaExecuteCodeEventResponse from '@/utils/event/response/execute-code-event-response'
import NiaRemoveKeyboardEventResponse from '@/utils/event/response/remove-keyboard-event-response'
import NiaRemoveModifierEventResponse from '@/utils/event/response/remove-modifier-event-response'
import NiaSynchronizeEventResponse from '@/utils/event/response/synchronize-event-response'

export type NiaResponseType =
  NiaDefineKeyboardEventResponse |
  NiaDefineModifierEventResponse |
  NiaExecuteCodeEventResponse |
  NiaRemoveKeyboardEventResponse |
  NiaRemoveModifierEventResponse |
  NiaSynchronizeEventResponse

export default class NiaEventResponse {
  private readonly event: NiaResponseType

  constructor(event: NiaResponseType) {
    this.event = event
  }

  isDefineKeyboardEventResponse(): boolean {
    return this.event instanceof NiaDefineKeyboardEventResponse
  }

  isDefineModifierEventResponse(): boolean {
    return this.event instanceof NiaDefineModifierEventResponse
  }

  isExecuteCodeEventResponse(): boolean {
    return this.event instanceof NiaExecuteCodeEventResponse
  }

  isRemoveKeyboardEventResponse(): boolean {
    return this.event instanceof NiaRemoveKeyboardEventResponse
  }

  isRemoveModifierEventResponse(): boolean {
    return this.event instanceof NiaRemoveModifierEventResponse
  }

  isSynchronizeEventResponse(): boolean {
    return this.event instanceof NiaSynchronizeEventResponse
  }

  takeDefineKeyboardEventResponse(): NiaDefineKeyboardEventResponse {
    return this.event as NiaDefineKeyboardEventResponse
  }

  takeDefineModifierEventResponse(): NiaDefineModifierEventResponse {
    return this.event as NiaDefineModifierEventResponse
  }

  takeExecuteCodeEventResponse(): NiaExecuteCodeEventResponse {
    return this.event as NiaExecuteCodeEventResponse
  }

  takeRemoveKeyboardEventResponse(): NiaRemoveKeyboardEventResponse {
    return this.event as NiaRemoveKeyboardEventResponse
  }

  takeRemoveModifierEventResponse(): NiaRemoveModifierEventResponse {
    return this.event as NiaRemoveModifierEventResponse
  }

  takeSynchronizeEventResponse(): NiaSynchronizeEventResponse {
    return this.event as NiaSynchronizeEventResponse
  }
}
