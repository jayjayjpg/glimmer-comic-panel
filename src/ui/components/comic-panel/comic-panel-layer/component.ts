import Component, { tracked } from '@glimmer/component';

export default class ComicPanelLayer extends Component {
  @tracked frameTotal = this.args.frameTotal;

  @tracked('frameTotal')
  get bgStyle() {
    console.log(this.frameTotal);
    return `background-image: url(${this.args.image}); background-size: auto ${this.frameTotal * 100}%`;
  }
};
