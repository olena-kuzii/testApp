import { Lightning } from '@lightningjs/sdk'
import Item from './Item'

export default class List extends Lightning.Component {
  static _template() {
    return {}
  }
  _init() {
    this.index = 0
  }
  set items(items) {
    this.children = items.map((item, index) => {
      return {
        ref: 'ListItem-' + index,
        type: Item,
        x: index * 170,
        item,
      }
    })
  }
  _getFocused() {
    return this.children[this.index]
  }
  _handleLeft() {
    if (this.index > 0) {
      this.index--
    }
  }
  _handleRight() {
    if (this.index < this.children.length - 1) {
      this.index++
    }
  }

  _handleEnter() {
    this.fireAncestors('$changeMessage', this.index + 1, 0xff282d2b)
  }
}
