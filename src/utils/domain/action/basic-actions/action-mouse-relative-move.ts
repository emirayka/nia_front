import {ActionMouseRelativeMove} from 'nia-protocol-js'

import {
  NiaActionMouseAbsoluteMoveSerialized,
  SerializablePB,
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'
import SerializableObject from '@/utils/serializable-object'
import {NiaBasicAction} from '@/utils/domain/action/basic-actions/basic-action'

export interface NiaActionMouseRelativeMoveObject {
  dx: number
  dy: number
}

export type NiaActionMouseRelativeMoveSerialized = NiaActionMouseRelativeMoveObject

export class NiaActionMouseRelativeMove implements
  NiaBasicAction,
  SerializablePB<NiaActionMouseRelativeMove, ActionMouseRelativeMove>,
  SerializableObject<NiaActionMouseRelativeMove, NiaActionMouseRelativeMoveSerialized> {
  private readonly dx: number
  private readonly dy: number

  constructor(args: NiaActionMouseRelativeMoveObject) {
    this.dx = args.dx
    this.dy = args.dy
  }

  getActionType(): NiaActionType {
    return NiaActionType.MouseRelativeMove
  }

  getActionTypeName(): string {
    return 'Mouse relative move'
  }

  getArgumentCount(): number {
    return 2
  }

  firstArgument(): string {
    return `${this.dx}`
  }

  secondArgument(): string {
    return `${this.dy}`
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
