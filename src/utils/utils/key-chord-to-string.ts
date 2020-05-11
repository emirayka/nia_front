import {keyChordPartToString} from './index'

export default (keyChord: [[number], number]) => {
  const all = [...keyChord[0], keyChord[1]]

  return all.map(keyChordPart => keyChordPartToString(keyChordPart))
    .join("+")
}
