export default class NiaGetDeviceInfoResult {
  private readonly path: string
  private readonly name: string
  private readonly model: string

  constructor(path: string, name: string, model: string) {
    this.path = path
    this.name = name
    this.model = model
  }

  getPath(): string {
    return this.path
  }

  getName(): string {
    return this.name
  }

  getModel(): string {
    return this.model
  }
}
