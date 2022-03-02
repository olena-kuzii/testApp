import { Lightning } from '@lightningjs/sdk'
export default class Button extends Lightning.Component {
  static _template() {
    return {
      y: 20,
      color: 0xff1f1f1f,
      texture: Lightning.Tools.getRoundRect(150, 70, 4),
      Label: {
        x: 75,
        y: 22,
        mount: 0.5,
        color: 0xff91968d,
        text: { fontSize: 20, zIndex: 100 },
      },
    }
  }
  _init() {
    this.tag('Label').patch({ text: { text: this.buttonText } })
  }
  _focus() {
    this.color = 0xff2b5554
  }
  _unfocus() {
    this.color = 0xff1f1f1f
  }

  _handleEnter() {
    this.fireAncestors('$changeLayout')
  }
}
