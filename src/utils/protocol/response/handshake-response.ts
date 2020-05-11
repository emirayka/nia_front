import {ok, err, Result} from 'neverthrow'

import {
  GetDevicesResponse,
  HandshakeResponse, Response,
} from 'nia-protocol-js'
import {NiaHandshakeResult} from '@/utils/protocol'
import {InvalidResponseError} from '@/utils'


class NiaHandshakeSuccessResult {
  version: string
  info: string

  private constructor(version: string, info: string) {
    this.version = version
    this.info = info
  }

  getVersion(): string {
    return this.version
  }

  getInfo(): string {
    return this.info
  }

  static from(successResult: HandshakeResponse.SuccessResult): NiaHandshakeSuccessResult {
    const version: string = successResult.getVersion()
    const info: string = successResult.getInfo()

    return new NiaHandshakeSuccessResult(version, info)
  }
}

class NiaHandshakeErrorResult {
  message: string;

  constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }

  static from(errorResult: HandshakeResponse.ErrorResult): NiaHandshakeErrorResult {
    const message: string = errorResult.getMessage()

    return new NiaHandshakeErrorResult(message)
  }
}

export default class NiaHandshakeResponse {
  response: NiaHandshakeSuccessResult | NiaHandshakeErrorResult;

  constructor(response: NiaHandshakeSuccessResult | NiaHandshakeErrorResult) {
    this.response = response
  }

  isSuccess(): boolean {
    return this.response instanceof NiaHandshakeSuccessResult
  }

  isError(): boolean {
    return this.response instanceof NiaHandshakeErrorResult
  }

  toResult(): Result<NiaHandshakeResult, InvalidResponseError> {
    if (this.response instanceof NiaHandshakeErrorResult) {
      return err(new InvalidResponseError(this.response.getMessage()))
    } else {
      const info: string = this.response.getInfo()
      const version: string = this.response.getVersion()

      const result: NiaHandshakeResult = {
        info,
        version
      }

      return ok(result)
    }
  }

  static from(getDevicesResponse: HandshakeResponse): Result<NiaHandshakeResponse, InvalidResponseError> {
    if (getDevicesResponse.getResultCase() === HandshakeResponse.ResultCase.SUCCESS_RESULT) {
      const successResult: HandshakeResponse.SuccessResult | undefined = getDevicesResponse.getSuccessResult()

      if (successResult === undefined) {
        return err(new InvalidResponseError('Success result was not set.'))
      }

      let niaHandshakeSuccessResult: NiaHandshakeSuccessResult = NiaHandshakeSuccessResult.from(successResult)

      return ok(new NiaHandshakeResponse(niaHandshakeSuccessResult))
    } else if (getDevicesResponse.getResultCase() === HandshakeResponse.ResultCase.ERROR_RESULT) {
      const errorResult: HandshakeResponse.ErrorResult | undefined = getDevicesResponse.getErrorResult()

      if (errorResult === undefined) {
        return err(new InvalidResponseError('Error result was not set.'))
      }

      const niaHandshakeErrorResult: NiaHandshakeErrorResult = NiaHandshakeErrorResult.from(errorResult)

      return ok(new NiaHandshakeResponse(niaHandshakeErrorResult))
    }

    return err(new InvalidResponseError('Result was not set.'))
  }

  static fromResponse(response: Response): Result<NiaHandshakeResponse, InvalidResponseError> {
    if (response.getRequestCase() !== Response.RequestCase.HANDSHAKE_RESPONSE) {
      return err(new InvalidResponseError('Invalid response. Expected Handshake Response.'))
    }

    const handshakeResponse: HandshakeResponse | undefined = response.getHandshakeResponse()

    if (handshakeResponse === undefined) {
      return err(new InvalidResponseError('Handshake response was not set'))
    }

    return NiaHandshakeResponse.from(handshakeResponse)
  }


  static fromUInt8Array(data: Uint8Array): Result<NiaHandshakeResponse, InvalidResponseError> {
    const response: Response = Response.deserializeBinary(data)

    return NiaHandshakeResponse.fromResponse(response)
  }
}
