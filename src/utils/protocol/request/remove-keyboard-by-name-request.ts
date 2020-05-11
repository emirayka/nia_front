import {
  Request,
  RemoveKeyboardByNameRequest
} from 'nia-protocol-js'

export default class NiaRemoveKeyboardByNameRequest {
  private readonly keyboardName: string

  constructor(keyboardName: string) {
    this.keyboardName = keyboardName
  }

  getKeyboardName(): string {
    return this.keyboardName
  }

  toRequest(): Request {
    const removeKeyboardByNameRequest = new RemoveKeyboardByNameRequest()
    removeKeyboardByNameRequest.setKeyboardName(this.keyboardName)

    const request = new Request()
    request.setRemoveKeyboardByNameRequest(removeKeyboardByNameRequest)

    return request
  }
}
