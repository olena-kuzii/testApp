import { Router } from '@lightningjs/sdk'

import { Lightning, Utils, Img } from '@lightningjs/sdk'
import List from './Components/List'
import Button from './Components/Button'
import ButtonBack from './Components/ButtonBack'

let isPicture = false

export default class App extends Router.App {
  _setup() {
    Router.startRouter(routes)
  }
  static _template() {
    return {
      Buttons: {
        LeftButton: { x: 500, type: Button, buttonText: 'Images' },
        RightButton: { x: 900, type: Button, buttonText: 'Rectangles' },
      },
      List: {
        List1: { y: 100, type: List },
        List2: { y: 300, type: List },
      },
      Message: {
        y: 10,
      },
      Picture: {},
    }
  }

  _init() {
    this.buttonIndex = 0
    this.listIndex
    this.tag('List1').items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => ({ label: i }))
    this.tag('List2').items = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(i => ({ label: i }))

    this._setState('Buttons')
  }
  _handleUp() {
    if (this.listIndex === 0) {
      this._setState('Buttons')
    } else if (this.listIndex === 1) {
      this.listIndex = 0
      this._setState('List')
    }
  }
  _handleDown() {
    if (this.listIndex === 0) {
      this.listIndex = 1
      this._setState('List')
    } else {
      this.listIndex = 0
      this._setState('List')
    }
  }
  static _states() {
    return [
      class Buttons extends this {
        _handleLeft() {
          this.buttonIndex = 0
        }
        _handleRight() {
          this.buttonIndex = 1
        }

        _handleDown() {
          this._setState('List')
          this.listIndex = 0
        }

        _getFocused() {
          return this.tag('Buttons').children[this.buttonIndex]
        }
      },
      class List extends this {
        _handleUp() {
          if (this.listIndex === 0) {
            console.log(this.listIndex, '-ggggggggg-ggggggggg-gggggg-')
            this._setState('Buttons')
          } else if (this.listIndex === 1) {
            this.listIndex = 0
            this._setState('List')
          }
        }
        _handleRight() {
          this.listIndex = 1
        }
        _getFocused() {
          return this.tag('List').children[this.listIndex]
        }

        _handleDown() {
          if (this.listIndex === 0) {
            this.listIndex = 1
            this._setState('List')
          }
        }
      },
      class ButtonBack extends this {
        _getFocused() {
          return this.tag('ButtonBack')
        }
      },
    ]
  }

  $changeMessage(index, color) {
    if (this.listIndex === 1) {
      index += 10
    }
    this.tag('Message').patch({
      x: 30,
      text: { text: 'You pressed number ' + index++ + ' !' },
      smooth: { color },
    })

    if (isPicture) {
      Router.navigate('home')

      this.tag('Picture').patch({
        Background: {
          w: 1920,
          h: 1080,
          src: Utils.asset(`images/${index}.jpg`),
        },
        Text: {
          x: 200,
          y: 160,
          text: {
            text: `I am a picture that you was chosen, I was the ${index}th`,
            fontSize: 62,
            wordWrap: true,
            wordWrapWidth: 450,
            lineHeight: 70,
          },
        },
        ButtonBack: { type: ButtonBack },
      })
      this.tag('Buttons').patch({
        LeftButton: undefined,
        RightButton: undefined,
      }),
        this.tag('List').patch({
          List1: undefined,
          List2: undefined,
        }),
        this.tag('Message').patch({
          text: undefined,
        }),
        this._setState('ButtonBack')
    }
  }

  $changeLayoutToBoxes() {
    this._setState('Buttons')

    this.tag('Picture').patch({
      w: 1920,
      h: 1080,
      color: 0xfffbb03b,
      src: undefined,
      ButtonBack: undefined,
      text: undefined,
    })
  }

  $changeLayout() {
    if (this.buttonIndex === 0) {
      isPicture = true
      this.tag('List1').children.forEach(item => {
        item.tag('Label').patch({
          w: 150,
          h: 150,
          src: `../static/images/${item.item.label}.jpg`,
        })
      })

      this.tag('List2').children.forEach(item => {
        item.tag('Label').patch({
          w: 150,
          h: 150,
          src: `../static/images/${item.item.label}.jpg`,
        })
      })
    } else if (this.buttonIndex === 1) {
      isPicture = false
      console.log(this.buttonIndex, '---this.buttonIndex---')
      this.tag('List1').children.forEach(item => {
        item.tag('Label').patch({
          text: {
            src: undefined,
            text: item.item.label,
          },
        })
      })

      this.tag('List2').children.forEach(item => {
        item.tag('Label').patch({
          text: {
            src: undefined,
            text: item.item.label,
          },
        })
      })
    }
  }
}
