export default class BasicError extends Error {
  cause: BasicError | Error | null

  constructor(m: string) {
    super(m)

    this.name = 'BasicError'
    this.cause = null
    const actualProto = new.target.prototype
    Object.setPrototypeOf(this, actualProto)
  }

  getCause(): BasicError | Error | null {
    return this.cause
  }

  getTotalCause(): Error {
    if (this.cause === null) {
      return this
    }

    if (this.cause instanceof BasicError) {
      return this.cause.getTotalCause()
    }

    return this.cause
  }
}
