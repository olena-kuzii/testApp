import { Lightning } from '@lightningjs/sdk'

export default class Item extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      w: 150,
      h: 150,
      color: 0xff489096,
      alpha: 0.8,
      Label: {},
      resizeMode: { type: 'cover', w: 150, h: 150 },
    }
  }
  _init() {
    this.patch({ Label: { text: { text: this.item.label } } })
  }
  _focus() {
    this.patch({ smooth: { alpha: 1, scale: 1.2 } })
  }
  _unfocus() {
    this.patch({ smooth: { alpha: 0.8, scale: 1 } })
  }
}
