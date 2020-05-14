import {
  GetDevicesResponse,
  HandshakeResponse, Response,
} from 'nia-protocol-js'
import {NiaHandshakeResult} from '@/utils/protocol'
import {InvalidResponseError} from '@/utils'
import {NiaResponseType} from '@/utils/protocol/response'

export interface NiaHandshakeObject {
  version: string,
  info: string,
  message: string
  success: boolean,
  error: boolean,
  failure: boolean,
}

export class NiaHandshakeResponse {
  private readonly version: string
  private readonly info: string
  private readonly message: string
  private readonly success: boolean
  private readonly error: boolean
  private readonly failure: boolean

  constructor(args: NiaHandshakeObject) {
    this.version = args.version
    this.info = args.info
    this.message = args.message
    this.success = args.success
    this.error = args.error
    this.failure = args.failure
  }

  getVersion(): string {
    return this.version
  }

  getInfo(): string {
    return this.info
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
    return NiaResponseType.Handshake
  }

  static fromPB(handshakeResponsePB: HandshakeResponse): NiaHandshakeResponse {
    let version: string = ''
    let info: string = ''
    let message: string = ''
    let success: boolean = false
    let error: boolean = false
    let failure: boolean = false

    switch (handshakeResponsePB.getResultCase()) {
      case HandshakeResponse.ResultCase.SUCCESS_RESULT:
        version = handshakeResponsePB?.getSuccessResult()?.getVersion() ?? ''
        info = handshakeResponsePB?.getSuccessResult()?.getInfo() ?? ''
        success = true
      case HandshakeResponse.ResultCase.ERROR_RESULT:
        message = handshakeResponsePB.getErrorResult()?.getMessage() ?? ''
        error = true
      case HandshakeResponse.ResultCase.FAILURE_RESULT:
        message = handshakeResponsePB.getFailureResult()?.getMessage() ?? ''
        failure = true
    }

    return new NiaHandshakeResponse({
      version,
      info,
      message,
      success,
      error,
      failure,
    })
  }
}
