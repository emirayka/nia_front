import {NiaKeyChord, NiaRequest, NiaRequestType, SerializablePB} from '@/utils'
import {KeyChord, RemoveMappingRequest} from 'nia-protocol-js'

export class NiaRemoveMappingRequest implements SerializablePB<NiaRemoveMappingRequest, RemoveMappingRequest> {
  private readonly keyChords: Array<NiaKeyChord>

  constructor(keyChords: Array<NiaKeyChord>) {
    this.keyChords = keyChords
  }

  getKeyChords(): Array<NiaKeyChord> {
    return this.keyChords
  }

  getType(): NiaRequestType {
    return NiaRequestType.RemoveMapping
  }

  toRequest(): NiaRequest {
    return new NiaRequest(this)
  }

  toPB(): RemoveMappingRequest {
    const keyChordsPB: Array<KeyChord> = this.keyChords
      .map((keyChord: NiaKeyChord) => keyChord.toPB())

    const removeMappingRequestPB: RemoveMappingRequest = new RemoveMappingRequest()

    removeMappingRequestPB.setKeyChordsList(keyChordsPB)

    return removeMappingRequestPB
  }
}
