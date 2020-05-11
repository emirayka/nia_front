import {
  Request,
  DefineModifierRequest
} from 'nia-protocol-js'

export default class NiaDefineModifierRequest {
  private readonly keyboardPath: string
  private readonly keyCode: number

  constructor(keyboardPath: string, keyCode: number) {
    this.keyboardPath = keyboardPath
    this.keyCode = keyCode
  }

  getKeyboardPath(): string {
    return this.keyboardPath
  }

  getKeyCode(): number {
    return this.keyCode
  }

  toRequest(): Request {
    const defineModifierRequest = new DefineModifierRequest()
    defineModifierRequest.setKeyboardPath(this.keyboardPath)
    defineModifierRequest.setKeyCode(this.keyCode)

    const request = new Request()
    request.setDefineModifierRequest(defineModifierRequest)

    return request
  }
}
