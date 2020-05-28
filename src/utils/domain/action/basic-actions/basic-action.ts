import {NiaActionType} from '@/utils'

export interface NiaBasicAction {
  getArgumentCount(): number;
  firstArgument(): string;
  secondArgument(): string;
  getActionType(): NiaActionType;
  getActionTypeName(): string;
}