import {
  mapKeyCodeToKeyIdentifier,
} from '../utils/'

export default (keyChordPart) => {
  const stringRepresentation = (keyChordPart instanceof Array)
    ? `${keyChordPart[0]}:${mapKeyCodeToKeyIdentifier(keyChordPart[1])}`
    : `${mapKeyCodeToKeyIdentifier(keyChordPart)}`

  return `(keyboard:define-modifier "${stringRepresentation}")`
}
