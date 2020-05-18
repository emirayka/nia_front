import {
  DeviceInfo,
  GetDevicesResponse,
  Response,
} from 'nia-protocol-js'
import {InvalidResponseError} from '@/utils'
import {NiaDeviceInfo} from '@/utils/domain/device/device-info'
import {NiaResponseType} from '@/utils/protocol/response'

export interface NiaGetDevicesResponseObject {
  devices: Array<NiaDeviceInfo>
  message: string
  success: boolean
  error: boolean
  failure: boolean
}

export class NiaGetDevicesResponse {
  private readonly devices: Array<NiaDeviceInfo>
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaGetDevicesResponseObject) {
    this.devices = args.devices
    this.message = args.message
    this.success = args.success
    this.error = args.error
    this.failure = args.failure
  }

  getDevices(): Array<NiaDeviceInfo> {
    return this.devices
  }

  getMessage(): string {
    return this.message
  }

  isSuccess(): boolean {
    return this.success
  }

  isError(): boolean {
    return this.error
  }

  isFailure(): boolean {
    return this.failure
  }

  getType(): NiaResponseType {
    return NiaResponseType.GetDevices
  }

  static fromPB(getDevicesResponsePB: GetDevicesResponse): NiaGetDevicesResponse {
    let devices: Array<NiaDeviceInfo> = []
    let message: string = ''
    let success: boolean = false
    let error: boolean = false
    let failure: boolean = false

    switch (getDevicesResponsePB.getResultCase()) {
      case GetDevicesResponse.ResultCase.SUCCESS_RESULT:
        const devicesInfoPB: Array<DeviceInfo> = getDevicesResponsePB.getSuccessResult()?.getDevicesInfoList() ?? []

        for (const deviceInfoPB of devicesInfoPB) {
          const deviceInfo: NiaDeviceInfo = NiaDeviceInfo.fromPB(deviceInfoPB)

          devices.push(deviceInfo)
        }

        success = true
        break;
      case GetDevicesResponse.ResultCase.ERROR_RESULT:
        message = getDevicesResponsePB.getErrorResult()?.getMessage() ?? ''
        error = true
        break;
      case GetDevicesResponse.ResultCase.FAILURE_RESULT:
        message = getDevicesResponsePB.getFailureResult()?.getMessage() ?? ''
        failure = true
        break;
    }

    const args: NiaGetDevicesResponseObject = {
      devices,
      message,
      success,
      error,
      failure
    }

    return new NiaGetDevicesResponse(args)
  }
}
