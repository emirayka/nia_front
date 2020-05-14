import {mapKeyCodeToString} from './index'

export default (keyChordPart: [number, number] | number) => {
  if (keyChordPart instanceof Array) {
    return `${keyChordPart[0]}:${mapKeyCodeToString(keyChordPart[1])}`
  } else {
    return `${mapKeyCodeToString(keyChordPart)}`
  }
}