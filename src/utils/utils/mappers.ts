import {CODE_TO_STRING, STRING_TO_CODE} from '@/utils/utils/map'
import {GROUP_ALL_KEYS, GROUP_ALL_MOUSE_BUTTONS} from '@/utils'

export const mapKeyCodeToString = (keyCode: number) => CODE_TO_STRING[keyCode]
export const mapStringToKeyCode = (s: string) => STRING_TO_CODE[s]

export const mapKeyCodeToIndex = (keyCode: number): number => {
  let name: string = mapKeyCodeToString(keyCode)
  let index: number = GROUP_ALL_KEYS.indexOf(name)

  return index
}
export const mapMouseButtonCodeToIndex = (buttonCode: number): number => {
  let name: string = mapKeyCodeToString(buttonCode)
  let index: number = GROUP_ALL_MOUSE_BUTTONS.indexOf(name)

  return index
}

