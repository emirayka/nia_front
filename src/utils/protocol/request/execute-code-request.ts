import {
  Request,
  ExecuteCodeRequest,
} from 'nia-protocol-js'

export default class NiaExecuteCodeRequest {
  private readonly code: string

  constructor(code: string) {
    this.code = code
  }
  
  getCode(): string {
    return this.code
  }

  toRequest(): Request {
    const executeCodeRequest = new ExecuteCodeRequest()
    executeCodeRequest.setCode(this.code)

    const request = new Request()
    request.setExecuteCodeRequest(executeCodeRequest)

    return request
  }
}
