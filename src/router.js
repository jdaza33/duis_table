import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/layouts/Login.vue'
import Panel from './components/layouts/Panel.vue'
import Session from './components/opentok/Session.vue'
import Tablero from './components/views/Tablero.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/panel',
      name: 'panel',
      redirect: '/panel/tablero',
      component: Panel,
      children: [
        {
          path: 'session',
          name: 'session',
          component: Session
        },
        {
          path: 'tablero',
          name: 'tablero',
          component: Tablero
        }
      ]
    }
  ]
})
