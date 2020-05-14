import {
  Request,
  GetDevicesRequest,
} from 'nia-protocol-js'
import {NiaRequest, NiaRequestType, SerializablePB} from '@/utils'

export class NiaGetDevicesRequest implements SerializablePB<NiaGetDevicesRequest, GetDevicesRequest> {
  constructor() {}

  getType(): NiaRequestType {
    return NiaRequestType.GetDevices
  }

  toRequest(): NiaRequest {
    return new NiaRequest(this)
  }

  toPB(): GetDevicesRequest {
    const getDevicesRequest = new GetDevicesRequest()

    return getDevicesRequest
  }
}
