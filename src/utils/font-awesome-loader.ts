import { library } from '@fortawesome/fontawesome-svg-core'
import * as svgIcons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

([
  svgIcons.faFolder,
  svgIcons.faFolderOpen,
  svgIcons.faFile,
  svgIcons.faVolumeOff,
  svgIcons.faVolumeUp,
  svgIcons.faVolumeDown,
  svgIcons.faStopCircle,
  svgIcons.faStepForward,
  svgIcons.faStepBackward,
  svgIcons.faPause,
]).forEach((icon) => {
  library.add(icon)
})

export default FontAwesomeIcon
