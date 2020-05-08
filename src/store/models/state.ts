import {DeviceInfo, ExecutionResult} from '@/store/models/index'

export default interface State {
  devices: Array<string>
  devicesInfo: Array<DeviceInfo>
  code: string
  log: Array<ExecutionResult>
  version: string
  info: string
}
