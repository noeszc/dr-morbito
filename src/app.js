import Highway from '@dogstudio/highway';

import CustomCursor from './cursor';
import CustomTransition from './custom-transition';

const H = new Highway.Core({
  transitions: {
    default: CustomTransition,
  },
});

const cursor = new CustomCursor();
cursor.init();

(function drawFrame(){
  window.requestAnimationFrame(drawFrame, cursor)
  cursor.update()
}())
