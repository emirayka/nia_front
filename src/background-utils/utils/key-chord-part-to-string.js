import {mapKeyCodeToKeyIdentifier} from './index.js'

export default (keyChordPart) => {
  if (keyChordPart instanceof Array) {
    return `${keyChordPart[0]}:${mapKeyCodeToKeyIdentifier(keyChordPart[1])}`
  } else {
    return `${mapKeyCodeToKeyIdentifier(keyChordPart)}`
  }
}