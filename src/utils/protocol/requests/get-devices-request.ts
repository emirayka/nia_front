import {
  Request,
  GetDevicesRequest,
} from 'nia-protocol-js'
import {NiaRequestType, SerializablePB} from '@/utils'

export class NiaGetDevicesRequest implements SerializablePB<NiaGetDevicesRequest, GetDevicesRequest> {
  constructor() {}

  getType(): NiaRequestType {
    return NiaRequestType.GetDevices
  }

  toPB(): GetDevicesRequest {
    const getDevicesRequest = new GetDevicesRequest()

    return getDevicesRequest
  }
}
