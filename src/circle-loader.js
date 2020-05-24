import createElement from './util';
import anime from 'animejs/lib/anime.es.js';

class CircleLoader {
  props = {
    x: 0,
    y: 0,
    isShowing: false,
    circleAnim: null,
    circleHeight: 0,
    on: false,
  };

  elements = {};

  constructor(){
    this.init();
  }

  init() {
    this.elements.root = createElement('div', { className: 'circle-loader ' });
    this.elements.circle = createElement('div', {
      className: 'circle-loader__inner',
      parent: this.elements.root,
    });

    this.props.circleHeight = 5 * window.innerHeight;

    this.toggleListener();

    // router.on('NAVIGATE_IN', () => {
    //   // off mouse listener
    //   this.toggleListener();
    //   // trigger animation:
    //   this.animate();
    // });
  }

  toggleListener = () => {
    this.props.on = !this.props.on;
    console.log(this.props.on);
    if (this.props.on) {
      document.addEventListener('mousemove', this.getPosition);
    } else {
      document.removeEventListener('mousemove', this.getPosition);
    }
  };

  getPosition = (e) => {
    const ev = event.touches ? event.touches[0] : event;
    this.props.x = ev.clientX;
    this.props.y = ev.clientY;

    this.render();
  };

  render = () => {
    this.elements.root.style.top = `${this.props.y}px`;
    this.elements.root.style.left = `${this.props.x}px`;
  };

  animate = (callback) => {
    console.log('animate with this props', this.props);
    
    anime({
      targets: this.elements.circle,
      width: this.props.circleHeight,
      height: this.props.circleHeight,
      easing: 'easeInOutQuad',
      duration: 900,
      complete: () => {
        this.elements.circle.style = '';
        this.toggleListener();
        callback()
      },
    });
  };
}

export default CircleLoader;
