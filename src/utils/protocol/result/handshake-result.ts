export default class NiaHandshakeResult {
  private readonly info: string
  private readonly version: string

  constructor(info: string, version: string) {
    this.info = info
    this.version = version
  }

  getInfo(): string {
    return this.info
  }

  getVersion(): string {
    return this.version
  }
}