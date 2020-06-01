import hi from './hi'
import help from './help'
import version from './version'
import echo from './echo'

import listDevices from './list-devices'
import enableDevice from './enable-device'
import disableDevice from './disable-device'

import listModifiers from './list-modifiers'
import defineModifier from './define-modifier'
import removeModifier from './remove-modifier'
import clearModifiers from './clear-modifiers'

import sendAction from './send-action'
import listActions from './list-actions'
import clearActions from './clear-actions'
import defineAction from './define-action'
import removeAction from './remove-action'

import listMappings from './list-mappings'
import changeMapping from './change-mapping'
import defineMapping from './define-mapping'
import removeMapping from './remove-mapping'
import clearMappings from './clear-mappings'

import startListening from './start-listening'
import stopListening from './stop-listening'

export default {
  'hi': hi,
  'help': help,
  'version': version,
  'echo': echo,

  'list-devices': listDevices,
  'enable-device': enableDevice,
  'disable-device': disableDevice,

  'list-modifiers': listModifiers,
  'define-modifier': defineModifier,
  'remove-modifier': removeModifier,
  'clear-modifiers': clearModifiers,

  'list-actions': listActions,
  'send-action': sendAction,
  'define-action': defineAction,
  'remove-action': removeAction,
  'clear-actions': clearActions,

  'list-mappings': listMappings,
  'define-mapping': defineMapping,
  'change-mapping': changeMapping,
  'remove-mapping': removeMapping,
  'clear-mappings': clearMappings,

  'start-listening': startListening,
  'stop-listening': stopListening,
}