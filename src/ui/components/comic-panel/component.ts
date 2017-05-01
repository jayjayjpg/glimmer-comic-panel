import Component, { tracked } from "@glimmer/component";
/* global document.timeline, KeyframeEffect, GroupEffect */
declare var KeyframeEffect: any;
declare var GroupEffect: any;
declare var document, timeline: any;

export default class ComicPanel extends Component {

  @tracked isAnimationRunning = false;
  keyframeEffects = [];
  frameTotal = 6;
  animation = null;

  animations = [{
    layerId: 'comic-panel-layer-1',
    image: 'img/racoonhero.png',
    frameTotal: this.frameTotal,
    keyframeSet: [
      { backgroundPosition: '0 0' },
      { backgroundPosition: '0 100%' }
    ],
    keyframeOptions: {
      duration: 400,
      fill: 'none',
      direction: 'normal',
      easing: `steps(${this.frameTotal - 1})`,
      iterations: 'Infinity'
    }
  }];

  @tracked('isAnimationRunning')
  get isPlaying() {
    return this.isAnimationRunning;
  }

  didInsertElement() {
    const animation = this.animations[0];
    const keyFrames = animation.keyframeSet;
    const layerElement = document.getElementById(animation.layerId);
    const timings = animation.keyframeOptions;
    const layerKeyframe = new KeyframeEffect(layerElement, keyFrames, timings);
    this.keyframeEffects = [
      ...this.keyframeEffects,
      layerKeyframe
    ];
    const groupEffect = new GroupEffect(this.keyframeEffects);
    const animationInstance = document.timeline.play(groupEffect);
    animationInstance.pause();
    this.animation = animationInstance;
  }

  togglePlayState() {
    this.isAnimationRunning = !this.isAnimationRunning;
    if (this.isAnimationRunning) {
      this.animation.play();
    }
    else {
      this.animation.pause();
    }
  }
}
