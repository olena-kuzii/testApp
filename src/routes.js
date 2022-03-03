import App from './App'
import Button from './Components/Button'
import ButtonBack from './Components/ButtonBack'
import List from './Components/List'
import Picture from './Components/Picture'

export default {
  root: 'home',
  routes: [
    {
      path: 'home',
      component: List,
    },
    {
      path: 'home/picture',
      component: ButtonBack,
    },
  ],
}
