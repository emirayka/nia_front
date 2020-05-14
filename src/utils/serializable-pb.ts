export interface SerializablePB<NiaType, PBType> {
  toPB(): PBType;
}