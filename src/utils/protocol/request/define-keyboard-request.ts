import {
  Request,
  DefineKeyboardRequest
} from 'nia-protocol-js'

export default class NiaDefineKeyboardRequest {
  private readonly keyboardPath: string
  private readonly keyboardName: string

  constructor(keyboardPath: string, keyboardName: string) {
    this.keyboardPath = keyboardPath
    this.keyboardName = keyboardName
  }

  getKeyboardPath(): string {
    return this.keyboardPath
  }

  getKeyboardName(): string {
    return this.keyboardName
  }

  toRequest(): Request {
    const defineKeyboardRequest = new DefineKeyboardRequest()
    defineKeyboardRequest.setKeyboardName(this.keyboardName)
    defineKeyboardRequest.setKeyboardPath(this.keyboardPath)

    const request = new Request()
    request.setDefineKeyboardRequest(defineKeyboardRequest)

    return request
  }
}
