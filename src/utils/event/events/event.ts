import NiaDefineKeyboardEvent from '@/utils/event/events/define-keyboard-event'
import NiaDefineModifierEvent from '@/utils/event/events/define-modifier-event'
import NiaExecuteCodeEvent from '@/utils/event/events/execute-code-event'
import NiaRemoveKeyboardEvent from '@/utils/event/events/remove-keyboard-event'
import NiaRemoveModifierEvent from '@/utils/event/events/remove-modifier-event'
import NiaSynchronizeEvent from '@/utils/event/events/synchronize-event'

export type NiaEventType =
  NiaDefineKeyboardEvent |
  NiaDefineModifierEvent |
  NiaExecuteCodeEvent |
  NiaRemoveKeyboardEvent |
  NiaRemoveModifierEvent |
  NiaSynchronizeEvent

export default class NiaEvent {
  private readonly event: NiaEventType

  constructor(event: NiaEventType) {
    this.event = event
  }

  isDefineKeyboardEvent(): boolean {
    return this.event instanceof NiaDefineKeyboardEvent
  }

  isDefineModifierEvent(): boolean {
    return this.event instanceof NiaDefineModifierEvent
  }

  isExecuteCodeEvent(): boolean {
    return this.event instanceof NiaExecuteCodeEvent
  }

  isRemoveKeyboardEvent(): boolean {
    return this.event instanceof NiaRemoveKeyboardEvent
  }

  isRemoveModifierEvent(): boolean {
    return this.event instanceof NiaRemoveModifierEvent
  }

  isSynchronizeEvent(): boolean {
    return this.event instanceof NiaSynchronizeEvent
  }

  takeDefineKeyboardEvent(): NiaDefineKeyboardEvent {
    return this.event as NiaDefineKeyboardEvent
  }

  takeDefineModifierEvent(): NiaDefineModifierEvent {
    return this.event as NiaDefineModifierEvent
  }

  takeExecuteCodeEvent(): NiaExecuteCodeEvent {
    return this.event as NiaExecuteCodeEvent
  }

  takeRemoveKeyboardEvent(): NiaRemoveKeyboardEvent {
    return this.event as NiaRemoveKeyboardEvent
  }

  takeRemoveModifierEvent(): NiaRemoveModifierEvent {
    return this.event as NiaRemoveModifierEvent
  }

  takeSynchronizeEvent(): NiaSynchronizeEvent {
    return this.event as NiaSynchronizeEvent
  }
}