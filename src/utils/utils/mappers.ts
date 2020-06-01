import {CODE_TO_STRING, STRING_TO_CODE} from '@/utils/utils/map'
import {GROUP_ALL_KEYS, GROUP_ALL_MOUSE_BUTTONS} from '@/utils'

export const mapKeyCodeToString = (keyCode: number): string | null => {
  if (keyCode in CODE_TO_STRING) {
    return CODE_TO_STRING[keyCode]
  }

  return null
}
export const mapStringToKeyCode = (s: string): number | null => {
  if (s in STRING_TO_CODE) {
    return STRING_TO_CODE[s]
  }

  return null
}

export const mapKeyCodeToIndex = (keyCode: number): number | null => {
  let name: string | null = mapKeyCodeToString(keyCode)

  if (name === null) {
    return null
  }

  let index: number = GROUP_ALL_KEYS.indexOf(name)

  return index
}
export const mapMouseButtonCodeToIndex = (buttonCode: number): number | null=> {
  let name: string | null = mapKeyCodeToString(buttonCode)

  if (name === null) {
    return null
  }

  let index: number = GROUP_ALL_MOUSE_BUTTONS.indexOf(name)

  return index
}

