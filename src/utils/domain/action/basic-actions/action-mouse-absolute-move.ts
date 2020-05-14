import {ActionMouseAbsoluteMove} from 'nia-protocol-js'

import {
  SerializablePB
} from '@/utils'
import {NiaAction} from '@/utils/domain/action/action'
import {NiaActionType} from '@/utils/domain/action/action-type'

export class NiaActionMouseAbsoluteMove implements SerializablePB<NiaActionMouseAbsoluteMove, ActionMouseAbsoluteMove> {
  private readonly x: number
  private readonly y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
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

  toAction(): NiaAction {
    return new NiaAction(this)
  }

  toPB(): ActionMouseAbsoluteMove {
    const actionMouseAbsoluteMove: ActionMouseAbsoluteMove = new ActionMouseAbsoluteMove()

    actionMouseAbsoluteMove.setX(this.x)
    actionMouseAbsoluteMove.setY(this.y)

    return actionMouseAbsoluteMove
  }

  static fromPB(actionMouseAbsoluteMove: ActionMouseAbsoluteMove): NiaActionMouseAbsoluteMove {
    const niaActionMouseAbsoluteMove: NiaActionMouseAbsoluteMove = new NiaActionMouseAbsoluteMove(
      actionMouseAbsoluteMove.getX(),
      actionMouseAbsoluteMove.getY(),
    )

    return niaActionMouseAbsoluteMove
  }
}
