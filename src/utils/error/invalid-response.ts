import BasicError from './basic-error'

export default class InvalidResponseError extends BasicError {
  constructor(m: string) {
    super(m)
  }
}
