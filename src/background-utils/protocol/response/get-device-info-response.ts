import {ok, err, Result} from 'neverthrow'

import {
  ExecuteCodeResponse,
  GetDeviceInfoResponse, Response,
} from 'nia-protocol-js'

import {
  BasicError,
  InvalidResponseError,
} from '@/background-utils/error'

import {
  NiaExecuteCodeResult,
  NiaGetDeviceInfoResult,
} from '@/background-utils/protocol/domain'

class NiaGetDeviceInfoSuccessResult {
  devicePath: string;
  deviceName: string;
  deviceModel: string;

  private constructor(devicePath: string, deviceName: string, deviceModel: string) {
    this.devicePath = devicePath
    this.deviceName = deviceName
    this.deviceModel = deviceModel
  }

  getDevicePath(): string {
    return this.devicePath
  }

  getDeviceName(): string {
    return this.deviceName
  }

  getDeviceModel(): string {
    return this.deviceModel
  }

  static from(successResult: GetDeviceInfoResponse.SuccessResult): NiaGetDeviceInfoSuccessResult {
    const devicePath: string = successResult.getDevice()
    const deviceName: string = successResult.getName()
    const deviceModel: string = successResult.getModel()

    return new NiaGetDeviceInfoSuccessResult(devicePath, deviceName, deviceModel)
  }
}

class NiaGetDeviceInfoErrorResult {
  message: string

  constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }

  static from(errorResult: GetDeviceInfoResponse.ErrorResult): NiaGetDeviceInfoErrorResult {
    const message: string = errorResult.getMessage()

    return new NiaGetDeviceInfoErrorResult(message)
  }
}

export default class NiaGetDeviceInfoResponse {
  response: NiaGetDeviceInfoSuccessResult | NiaGetDeviceInfoErrorResult;

  constructor(response: NiaGetDeviceInfoSuccessResult | NiaGetDeviceInfoErrorResult) {
    this.response = response
  }

  isSuccess(): boolean {
    return this.response instanceof NiaGetDeviceInfoSuccessResult
  }

  isError(): boolean {
    return this.response instanceof NiaGetDeviceInfoErrorResult
  }

  toResult(): Result<NiaGetDeviceInfoResult, InvalidResponseError> {
    if (this.response instanceof NiaGetDeviceInfoErrorResult) {
      return err(new InvalidResponseError(this.response.getMessage()))
    } else {
      const path: string = this.response.getDevicePath()
      const name: string = this.response.getDeviceName()
      const model: string = this.response.getDeviceModel()

      const result: NiaGetDeviceInfoResult = {
        path,
        name,
        model,
      }

      return ok(result)
    }
  }

  static from(response: GetDeviceInfoResponse): Result<NiaGetDeviceInfoResponse, InvalidResponseError> {
    if (response.getResultCase() === GetDeviceInfoResponse.ResultCase.SUCCESS_RESULT) {
      const successResult: GetDeviceInfoResponse.SuccessResult | undefined = response.getSuccessResult()

      if (successResult === undefined) {
        return err(new InvalidResponseError('Success result was not set'))
      }

      const niaGetDeviceInfoSuccessResult: NiaGetDeviceInfoSuccessResult = NiaGetDeviceInfoSuccessResult.from(successResult)

      return ok(new NiaGetDeviceInfoResponse(niaGetDeviceInfoSuccessResult))
    } else if (response.getResultCase() === GetDeviceInfoResponse.ResultCase.ERROR_RESULT) {
      const errorResult: GetDeviceInfoResponse.ErrorResult | undefined = response.getErrorResult()

      if (errorResult === undefined) {
        return err(new InvalidResponseError('Error result was not set'))
      }

      const niaGetDeviceInfoErrorResult: NiaGetDeviceInfoErrorResult = NiaGetDeviceInfoErrorResult.from(errorResult)

      return ok(new NiaGetDeviceInfoResponse(niaGetDeviceInfoErrorResult))
    }

    return err(new InvalidResponseError('Unknown result.'))
  }

  static fromResponse(response: Response): Result<NiaGetDeviceInfoResponse, InvalidResponseError> {
    if (response.getRequestCase() !== Response.RequestCase.GET_DEVICE_INFO_RESPONSE) {
      return err(new InvalidResponseError('Invalid response. Expected Get Device Info Response.'))
    }

    const getDeviceInfoResponse: GetDeviceInfoResponse | undefined = response.getGetDeviceInfoResponse()

    if (getDeviceInfoResponse === undefined) {
      return err(new InvalidResponseError('Get Device Info response was not set'))
    }

    return NiaGetDeviceInfoResponse.from(getDeviceInfoResponse)
  }

  static fromUInt8Array(data: Uint8Array): Result<NiaGetDeviceInfoResponse, InvalidResponseError> {
    const response: Response = Response.deserializeBinary(data)

    return NiaGetDeviceInfoResponse.fromResponse(response)
  }
}
