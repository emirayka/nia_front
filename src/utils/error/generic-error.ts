import BasicError from './basic-error'

export default class GenericError extends BasicError {
  constructor(m: string) {
    super(m)
  }
}
