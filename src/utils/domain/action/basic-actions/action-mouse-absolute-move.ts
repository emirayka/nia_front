import {ActionMouseAbsoluteMove} from 'nia-protocol-js'

import {
  NiaActionKeyReleaseSerialized,
  SerializablePB,
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'

export interface NiaActionMouseAbsoluteMoveObject {
  x: number
  y: number
}

export type NiaActionMouseAbsoluteMoveSerialized = NiaActionMouseAbsoluteMoveObject

export class NiaActionMouseAbsoluteMove implements SerializablePB<NiaActionMouseAbsoluteMove, ActionMouseAbsoluteMove>, SerializableObject<NiaActionMouseAbsoluteMove, NiaActionMouseAbsoluteMoveSerialized> {
  private readonly x: number
  private readonly y: number

  constructor(args: NiaActionMouseAbsoluteMoveObject) {
    this.x = args.x
    this.y = args.y
  }

  getActionType(): NiaActionType {
    return NiaActionType.MouseAbsoluteMove
  }

  getX(): number {
    return this.x
  }

  getY(): number {
    return this.y
  }

  toAction(name: string): NiaAction {
    return new NiaAction({
      actionName: name,
      action: this,
    })
  }

  toPB(): ActionMouseAbsoluteMove {
    const actionMouseAbsoluteMove: ActionMouseAbsoluteMove = new ActionMouseAbsoluteMove()

    actionMouseAbsoluteMove.setX(this.x)
    actionMouseAbsoluteMove.setY(this.y)

    return actionMouseAbsoluteMove
  }

  static fromPB(actionMouseAbsoluteMove: ActionMouseAbsoluteMove): NiaActionMouseAbsoluteMove {
    const niaActionMouseAbsoluteMove: NiaActionMouseAbsoluteMove = new NiaActionMouseAbsoluteMove({
      x: actionMouseAbsoluteMove.getX(),
      y: actionMouseAbsoluteMove.getY(),
  })

    return niaActionMouseAbsoluteMove
  }

  serialize(): NiaActionMouseAbsoluteMoveSerialized {
    return {
      x: this.x,
      y: this.y,
    }
  }

  static deserialize(serialized: NiaActionMouseAbsoluteMoveSerialized): NiaActionMouseAbsoluteMove {
    return new NiaActionMouseAbsoluteMove(serialized)
  }
}
