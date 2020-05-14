import {ActionMouseRelativeMove} from 'nia-protocol-js'

import {
  SerializablePB
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'

export class NiaActionMouseRelativeMove implements SerializablePB<NiaActionMouseRelativeMove, ActionMouseRelativeMove> {
  private readonly dx: number
  private readonly dy: number

  constructor(dx: number, dy: number) {
    this.dx = dx
    this.dy = dy
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
    return new NiaAction(this)
  }

  toPB(): ActionMouseRelativeMove {
    const actionMouseRelativeMove: ActionMouseRelativeMove = new ActionMouseRelativeMove()

    actionMouseRelativeMove.setDx(this.dx)
    actionMouseRelativeMove.setDy(this.dy)

    return actionMouseRelativeMove
  }

  static fromPB(actionMouseRelativeMove: ActionMouseRelativeMove): NiaActionMouseRelativeMove {
    const niaActionMouseRelativeMove: NiaActionMouseRelativeMove = new NiaActionMouseRelativeMove(
      actionMouseRelativeMove.getDx(),
      actionMouseRelativeMove.getDy(),
    )

    return niaActionMouseRelativeMove
  }
}
