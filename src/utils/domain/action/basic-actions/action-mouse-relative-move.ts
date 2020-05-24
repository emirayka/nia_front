import {ActionMouseRelativeMove} from 'nia-protocol-js'

import {
  NiaActionMouseAbsoluteMoveSerialized,
  SerializablePB,
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'

export interface NiaActionMouseRelativeMoveObject {
  dx: number
  dy: number
}

export type NiaActionMouseRelativeMoveSerialized = NiaActionMouseRelativeMoveObject

export class NiaActionMouseRelativeMove implements SerializablePB<NiaActionMouseRelativeMove, ActionMouseRelativeMove>, SerializableObject<NiaActionMouseRelativeMove, NiaActionMouseRelativeMoveSerialized> {
  private readonly dx: number
  private readonly dy: number

  constructor(args: NiaActionMouseRelativeMoveObject) {
    this.dx = args.dx
    this.dy = args.dy
  }

  getActionType(): NiaActionType {
    return NiaActionType.MouseRelativeMove
  }

  getDx(): number {
    return this.dx
  }

  getDy(): number {
    return this.dy
  }

  toAction(): NiaAction {
    return new NiaAction({
      action: this,
    })
  }

  toPB(): ActionMouseRelativeMove {
    const actionMouseRelativeMove: ActionMouseRelativeMove = new ActionMouseRelativeMove()

    actionMouseRelativeMove.setDx(this.dx)
    actionMouseRelativeMove.setDy(this.dy)

    return actionMouseRelativeMove
  }

  static fromPB(actionMouseRelativeMove: ActionMouseRelativeMove): NiaActionMouseRelativeMove {
    const niaActionMouseRelativeMove: NiaActionMouseRelativeMove = new NiaActionMouseRelativeMove({
      dx: actionMouseRelativeMove.getDx(),
      dy: actionMouseRelativeMove.getDy(),
  })

    return niaActionMouseRelativeMove
  }

  serialize(): NiaActionMouseRelativeMoveSerialized {
    return {
      dx: this.dx,
      dy: this.dy,
    }
  }

  static deserialize(serialized: NiaActionMouseRelativeMoveSerialized): NiaActionMouseRelativeMove {
    return new NiaActionMouseRelativeMove(serialized)
  }
}
