import {NiaMapping, NiaRequest, NiaRequestType, SerializablePB} from '@/utils'
import {DefineMappingRequest, Mapping} from 'nia-protocol-js'

export class NiaDefineMappingRequest implements SerializablePB<NiaDefineMappingRequest, DefineMappingRequest> {
  private readonly mapping: NiaMapping

  constructor(mapping: NiaMapping) {
    this.mapping = mapping
  }

  getMapping(): NiaMapping {
    return this.mapping
  }

  getType(): NiaRequestType {
    return NiaRequestType.DefineMapping
  }

  toRequest(): NiaRequest {
    return new NiaRequest(this)
  }

  toPB(): DefineMappingRequest {
    const mappingPB: Mapping = this.mapping.toPB()
    const defineMappingRequestPB: DefineMappingRequest = new DefineMappingRequest()

    defineMappingRequestPB.setMapping(mappingPB)

    return defineMappingRequestPB
  }
}
