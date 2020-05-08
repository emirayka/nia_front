import KeyDescription from '@/store/models'

export default interface KeyboardModel {
  width: number
  height: number
  keys: Array<KeyDescription>
}