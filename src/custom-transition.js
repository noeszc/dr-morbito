import Highway from '@dogstudio/highway';
import anime from 'animejs/lib/anime.es.js';
import CircleLoader from './circle-loader';

const loader = new CircleLoader();

class CustomTransition extends Highway.Transition {
  constructor(...args) {
    super(...args);
  }
  in({ from, to, done }) {
    window.scrollTo(0, 0);
    from.remove();

    to.style.opacity = 0;
    const entrance = () =>
      anime({
        targets: to,
        opacity: [0, 1],
        duration: 500,
        complete: () => {
          done();
        },
      });
    loader.toggleListener();
    loader.animate(entrance);
  }
  out({ from, done }) {
    done();
  }
}

export default CustomTransition;
