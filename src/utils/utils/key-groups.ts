import {
  STRING_TO_CODE
} from '@/utils/utils/map'

export const GROUP_TEXT_KEYS: Array<string> = 'abcdefghijklmnopqrstuvwxyz-=`,./;\'[]\\'.split('')
export const GROUP_NUMBER_KEYS: Array<string> = '0123456789'.split('')
export const GROUP_FUNCTION_KEYS: Array<string> =
  'F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12'.split(' ')

export const GROUP_CONTROL_KEYS: Array<string> = [
  'Esc',
  'Tab',
  'Enter',
  'Backspace',
  'Menu',
  'MetaL',
  'MetaR',
  'Space',
  'Up',
  'Left',
  'Down',
  'Right',
  'End',
  'Delete',
  'Insert',
  'Home',
  'PageUp',
  'PageDown',
  'Print',
  'Pause',
  'ScrollLock',
]

export const GROUP_KP_KEYS = [
  'KP0',
  'KP1',
  'KP2',
  'KP3',
  'KP4',
  'KP5',
  'KP6',
  'KP8',
  'KP9',
  'NumLock',
  'KP/',
  'KP*',
  'KP-',
  'KP+',
  'KP.',
  'KPEnter',
]

export const GROUP_MULTIMEDIA_KEYS = [
  'StopSong',
  'PreviousSong',
  'NextSong',
  'PlayPause',
  'VolumeUp',
  'VolumeDown',
  'Mute',
]

export const GROUP_MOUSE_BUTTON_KEYS = [
  'BTNLeft',
  'BTNRight',
  'BTNMiddle',
  'BTNSide',
  'BTNExtra',
  'BTNForward',
  'BTNBack',
  'BTNTask',
]

export const GROUP_ALL_KEYS = Object.getOwnPropertyNames(STRING_TO_CODE).sort()
export const GROUP_ALL_MOUSE_BUTTONS = GROUP_MOUSE_BUTTON_KEYS
