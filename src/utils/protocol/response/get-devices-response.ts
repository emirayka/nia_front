import {ok, err, Result} from 'neverthrow'

import {
  GetDeviceInfoResponse,
  GetDevicesResponse,
  Response,
} from 'nia-protocol-js'
import {NiaGetDevicesResult} from '@/utils/protocol'
import {InvalidResponseError} from '@/utils'


class NiaGetDevicesSuccessResult {
  devices: Array<string>

  private constructor(devices: Array<string>) {
    this.devices = devices
  }

  getDevices(): Array<string> {
    return this.devices
  }

  static from(successResult: GetDevicesResponse.SuccessResult): NiaGetDevicesSuccessResult {
    const devices: Array<string> = successResult.getDevicesList()

    return new NiaGetDevicesSuccessResult(devices)
  }
}

class NiaGetDevicesErrorResult {
  message: string;

  constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }

  static from(errorResult: GetDevicesResponse.ErrorResult): NiaGetDevicesErrorResult {
    const message: string = errorResult.getMessage()

    return new NiaGetDevicesErrorResult(message)
  }
}

export default class NiaGetDevicesResponse {
  response: NiaGetDevicesSuccessResult | NiaGetDevicesErrorResult;

  constructor(response: NiaGetDevicesSuccessResult | NiaGetDevicesErrorResult) {
    this.response = response
  }

  isSuccess(): boolean {
    return this.response instanceof NiaGetDevicesSuccessResult
  }

  isError(): boolean {
    return this.response instanceof NiaGetDevicesErrorResult
  }

  toResult(): Result<NiaGetDevicesResult, InvalidResponseError> {
    if (this.response instanceof NiaGetDevicesErrorResult) {
      return err(new InvalidResponseError(this.response.getMessage()))
    } else {
      const devices: Array<string> = this.response.getDevices()

      const result: NiaGetDevicesResult = {
        devices,
      }

      return ok(result)
    }
  }

  static from(getDevicesResponse: GetDevicesResponse): Result<NiaGetDevicesResponse, InvalidResponseError> {
    if (getDevicesResponse.getResultCase() === GetDevicesResponse.ResultCase.SUCCESS_RESULT) {
      const successResult: GetDevicesResponse.SuccessResult | undefined = getDevicesResponse.getSuccessResult()

      if (successResult === undefined) {
        return err(new InvalidResponseError('Success result was not set.'))
      }

      let niaGetDevicesSuccessResult: NiaGetDevicesSuccessResult = NiaGetDevicesSuccessResult.from(successResult)

      return ok(new NiaGetDevicesResponse(niaGetDevicesSuccessResult))
    } else if (getDevicesResponse.getResultCase() === GetDevicesResponse.ResultCase.ERROR_RESULT) {
      const errorResult: GetDevicesResponse.ErrorResult | undefined = getDevicesResponse.getErrorResult()

      if (errorResult === undefined) {
        return err(new InvalidResponseError('Error result was not set.'))
      }

      const niaGetDevicesErrorResult: NiaGetDevicesErrorResult = NiaGetDevicesErrorResult.from(errorResult)

      return ok(new NiaGetDevicesResponse(niaGetDevicesErrorResult))
    }

    return err(new InvalidResponseError('Result was not set.'))
  }

  static fromResponse(response: Response): Result<NiaGetDevicesResponse, InvalidResponseError> {
    if (response.getRequestCase() !== Response.RequestCase.GET_DEVICES_RESPONSE) {
      return err(new InvalidResponseError('Invalid response. Expected Get Devices Response.'))
    }

    const getDevicesResponse: GetDevicesResponse | undefined = response.getGetDevicesResponse()

    if (getDevicesResponse === undefined) {
      return err(new InvalidResponseError('Get Device Info response was not set'))
    }

    return NiaGetDevicesResponse.from(getDevicesResponse)
  }

  static fromUInt8Array(data: Uint8Array): Result<NiaGetDevicesResponse, InvalidResponseError> {
    const response: Response = Response.deserializeBinary(data)

    return NiaGetDevicesResponse.fromResponse(response)
  }
}
