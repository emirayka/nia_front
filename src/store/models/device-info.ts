import {KeyboardModel} from '@/store/models'

export interface DeviceInfo {
  path: string
  name: string
  model: KeyboardModel
  defined: boolean
}
