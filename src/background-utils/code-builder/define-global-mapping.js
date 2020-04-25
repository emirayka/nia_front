import {
  keyChordToString,
} from '../utils/'

export default (keyChords, actionCode) => {
  const keyChordsStringRepresentation = keyChords.map(keyChordToString)
    .join(" ")

  return `(keyboard:define-global-mapping "${keyChordsStringRepresentation}" ${actionCode})`
}
