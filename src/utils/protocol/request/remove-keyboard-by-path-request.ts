import {
  Request,
  RemoveKeyboardByPathRequest
} from 'nia-protocol-js'

export default class NiaRemoveKeyboardByPathRequest {
  private readonly keyboardPath: string

  constructor(keyboardPath: string) {
    this.keyboardPath = keyboardPath
  }

  getKeyboardPath(): string {
    return this.keyboardPath
  }

  toRequest(): Request {
    const removeKeyboardByPathRequest = new RemoveKeyboardByPathRequest()
    removeKeyboardByPathRequest.setKeyboardPath(this.keyboardPath)

    const request = new Request()
    request.setRemoveKeyboardByPathRequest(removeKeyboardByPathRequest)

    return request
  }
}
