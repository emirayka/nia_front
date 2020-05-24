import {NiaAction, NiaKeyChord, NiaMapping, NiaRequest, NiaRequestType, SerializablePB} from '@/utils'
import {Action, ChangeMappingRequest, KeyChord, Mapping} from 'nia-protocol-js'

export class NiaChangeMappingRequest implements SerializablePB<NiaChangeMappingRequest, ChangeMappingRequest> {
  private readonly keyChords: Array<NiaKeyChord>
  private readonly action: NiaAction

  constructor(keyChords: Array<NiaKeyChord>, action: NiaAction) {
    this.keyChords = keyChords
    this.action = action
  }

  getKeyChords(): Array<NiaKeyChord> {
    return this.keyChords
  }

  getAction(): NiaAction {
    return this.action
  }

  getType(): NiaRequestType {
    return NiaRequestType.ChangeMapping
  }

  toRequest(): NiaRequest {
    return new NiaRequest(this)
  }

  toPB(): ChangeMappingRequest {
    const keyChordsPB: Array<KeyChord> = this.keyChords
      .map((keyChord) => keyChord.toPB())

    const actionPB: Action = this.action.toPB()

    const changeMappingRequestPB: ChangeMappingRequest = new ChangeMappingRequest()

    changeMappingRequestPB.setKeyChordsList(keyChordsPB)
    changeMappingRequestPB.setAction(actionPB)

    return changeMappingRequestPB
  }
}
