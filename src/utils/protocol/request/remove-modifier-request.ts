import {
  Request,
  RemoveModifierRequest
} from 'nia-protocol-js'

export default class NiaRemoveModifierRequest {
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
    const removeModifierRequest = new RemoveModifierRequest()
    removeModifierRequest.setKeyboardPath(this.keyboardPath)
    removeModifierRequest.setKeyCode(this.keyCode)

    const request = new Request()
    request.setRemoveModifierRequest(removeModifierRequest)

    return request
  }
}
