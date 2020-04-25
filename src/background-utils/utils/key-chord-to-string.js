import {keyChordPartToString} from './index.js'

export default (keyChord) => {
  const all = [...keyChord[0], keyChord[1]]

  return all.map(keyChordPart => keyChordPartToString(keyChordPart))
    .join("+")
}
