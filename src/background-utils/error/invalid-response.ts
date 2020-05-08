import BasicError from './basic-error'

export default class InvalidResponse extends BasicError {
  constructor(m: string) {
    super(m)
  }
}
