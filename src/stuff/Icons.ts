const reload = require('../stuff/icons/reload.svg');
const left = require('../stuff/icons/arrow-left.svg');
const start = require('../stuff/icons/arrow-left-circle.svg');
const right = require('../stuff/icons/arrow-right.svg');
const end = require('../stuff/icons/arrow-right-circle.svg');
const fullscreen = require('../stuff/icons/full-screen.svg');
const fullscreenToggle = require('../stuff/icons/full-screen-toggle.svg');

const axes = require('../stuff/icons/axis.svg');


/**
 * Description placeholder
 * @date 3/4/2022 - 12:28:14 PM
 * @author Matej Hakoš
 *
 * @class Icons
 * @typedef {Icons}
 */
class Icons {
  static Reload = reload;
  static LeftArrow = left;
  static RightArrow = right;
  static EndArrow = end;
  static StartArrow = start;
  static FullScreen = fullscreen;
  static FullScreenToggle = fullscreenToggle;
  static AxesHelper = axes;

  static getIcons = () => {
    return {
      btnStart: Icons.StartArrow,
      btnLeft: Icons.LeftArrow,
      btnRight: Icons.RightArrow,
      btnEnd: Icons.EndArrow,
      btnReload: Icons.Reload,
      btnFullscreen: Icons.FullScreen,
      btnFullscreenToggle: Icons.FullScreenToggle,
      axesHelper: Icons.AxesHelper
    };
  };
}

export default Icons;
