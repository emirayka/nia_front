export default class NiaGetDevicesResult {
  private readonly devices: Array<string>

  constructor(devices: Array<string>) {
    this.devices = devices
  }

  getDevices(): Array<string> {
    return this.devices
  }
}
