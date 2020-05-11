import KeyboardModel from '@/store/models/keyboard-model'

export default interface DeviceInfo {
  path: string
  name: string
  model: KeyboardModel
  defined: boolean
}
