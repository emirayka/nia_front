import {mapKeyCodeToKeyIdentifier} from './index'

export default (keyChordPart: [number, number] | number) => {
  if (keyChordPart instanceof Array) {
    return `${keyChordPart[0]}:${mapKeyCodeToKeyIdentifier(keyChordPart[1])}`
  } else {
    return `${mapKeyCodeToKeyIdentifier(keyChordPart)}`
  }
}