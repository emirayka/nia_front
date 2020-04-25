import * as eventCodes from './linux-input-event-codes.js'

const map = {}

map[eventCodes.KEY_TAB] = "Tab"
map[eventCodes.KEY_CAPSLOCK] = "CapsLock"
map[eventCodes.KEY_LEFTSHIFT] = "LeftShift"
map[eventCodes.KEY_LEFTCTRL] = "LeftControl"
map[eventCodes.KEY_LEFTMETA] = "LeftMeta"
map[eventCodes.KEY_LEFTALT] = "LeftAlt"
map[eventCodes.KEY_SPACE] = "Space"
map[eventCodes.KEY_RIGHTSHIFT] = "RightShift"
map[eventCodes.KEY_RIGHTCTRL] = "RightControl"
map[eventCodes.KEY_RIGHTMETA] = "RightMeta"
map[eventCodes.KEY_RIGHTALT] = "RightAlt"
map[eventCodes.KEY_COMPOSE] = "Compose"
map[eventCodes.KEY_ENTER] = "Enter"
map[eventCodes.KEY_BACKSPACE] = "BackSpace"

map[eventCodes.KEY_A] = "a"
map[eventCodes.KEY_B] = "b"
map[eventCodes.KEY_C] = "c"
map[eventCodes.KEY_D] = "d"
map[eventCodes.KEY_E] = "e"
map[eventCodes.KEY_F] = "f"
map[eventCodes.KEY_G] = "g"
map[eventCodes.KEY_H] = "h"
map[eventCodes.KEY_I] = "i"
map[eventCodes.KEY_J] = "j"
map[eventCodes.KEY_K] = "k"
map[eventCodes.KEY_L] = "l"
map[eventCodes.KEY_M] = "m"
map[eventCodes.KEY_N] = "n"
map[eventCodes.KEY_O] = "o"
map[eventCodes.KEY_P] = "p"
map[eventCodes.KEY_Q] = "q"
map[eventCodes.KEY_R] = "r"
map[eventCodes.KEY_S] = "s"
map[eventCodes.KEY_T] = "t"
map[eventCodes.KEY_U] = "u"
map[eventCodes.KEY_V] = "v"
map[eventCodes.KEY_W] = "w"
map[eventCodes.KEY_X] = "x"
map[eventCodes.KEY_Y] = "y"
map[eventCodes.KEY_Z] = "z"

map[eventCodes.KEY_1] = "1"
map[eventCodes.KEY_2] = "2"
map[eventCodes.KEY_3] = "3"
map[eventCodes.KEY_4] = "4"
map[eventCodes.KEY_5] = "5"
map[eventCodes.KEY_6] = "6"
map[eventCodes.KEY_7] = "7"
map[eventCodes.KEY_8] = "8"
map[eventCodes.KEY_9] = "9"
map[eventCodes.KEY_0] = "0"

map[eventCodes.KEY_COMMA] = ","
map[eventCodes.KEY_DOT] = "."
map[eventCodes.KEY_SLASH] = "/"
map[eventCodes.KEY_SEMICOLON] = ";"
map[eventCodes.KEY_APOSTROPHE] = "'"
map[eventCodes.KEY_LEFTBRACE] = "["
map[eventCodes.KEY_RIGHTBRACE] = "]"
map[eventCodes.KEY_BACKSLASH] = "\\"
map[eventCodes.KEY_GRAVE] = "`"
map[eventCodes.KEY_MINUS] = "-"
map[eventCodes.KEY_EQUAL] = "+"

map[eventCodes.KEY_ESC] = "Esc"
map[eventCodes.KEY_F1] = "F1"
map[eventCodes.KEY_F2] = "F2"
map[eventCodes.KEY_F3] = "F3"
map[eventCodes.KEY_F4] = "F4"
map[eventCodes.KEY_F5] = "F5"
map[eventCodes.KEY_F6] = "F6"
map[eventCodes.KEY_F7] = "F7"
map[eventCodes.KEY_F8] = "F8"
map[eventCodes.KEY_F9] = "F9"
map[eventCodes.KEY_F10] = "F10"
map[eventCodes.KEY_F11] = "F11"
map[eventCodes.KEY_F12] = "F12"

map[eventCodes.KEY_SYSRQ] = "Print"
map[eventCodes.KEY_SCROLLLOCK] = "ScrollLock"
map[eventCodes.KEY_PAUSE] = "Pause"
map[eventCodes.KEY_INSERT] = "Insert"
map[eventCodes.KEY_HOME] = "Home"
map[eventCodes.KEY_PAGEUP] = "PageUp"
map[eventCodes.KEY_DELETE] = "Delete"
map[eventCodes.KEY_END] = "End"
map[eventCodes.KEY_PAGEDOWN] = "PageDown"
map[eventCodes.KEY_UP] = "Up"
map[eventCodes.KEY_DOWN] = "Down"
map[eventCodes.KEY_UP] = "Left"
map[eventCodes.KEY_RIGHT] = "Right"

map[eventCodes.KEY_NUMLOCK] = "NumLock"
map[eventCodes.KEY_KPSLASH] = "KPSlash"
map[eventCodes.KEY_NUMLOCK] = "KPAsterisk"
map[eventCodes.KEY_NUMLOCK] = "KPMinus"
map[eventCodes.KEY_KP1] = "KP1"
map[eventCodes.KEY_KP2] = "KP2"
map[eventCodes.KEY_KP3] = "KP3"
map[eventCodes.KEY_KP4] = "KP4"
map[eventCodes.KEY_KP5] = "KP5"
map[eventCodes.KEY_KP6] = "KP6"
map[eventCodes.KEY_KP7] = "KP7"
map[eventCodes.KEY_KP8] = "KP8"
map[eventCodes.KEY_KP9] = "KP9"
map[eventCodes.KEY_KP0] = "KP0"
map[eventCodes.KEY_KPPLUS] = "KPPlus"
map[eventCodes.KEY_KPENTER] = "KPEnter"
map[eventCodes.KEY_KPDOT] = "KPDot"

export default keyId => map[keyId]
