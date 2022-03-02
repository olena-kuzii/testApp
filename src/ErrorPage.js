import { Lightning } from '@lightningjs/sdk'

export default class ErrorPage extends Lightning.Component {
  static _template() {
    return {
      fontSize: 60,
      text: 'ops something went wrong! ',
      fontStyle: 'italic bold',
      textColor: 0xff282d2b,
      shadow: true,
      shadowColor: 0xffff00ff,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      shadowBlur: 2,
    }
  }
}
