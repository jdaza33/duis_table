import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/layouts/Login.vue'
import Panel from './components/layouts/Panel.vue'
import Session from './components/opentok/Session.vue'
import Tablero from './components/views/Tablero.vue'
import ModalClass from './components/views/ModalClass.vue'
import Class from './components/views/Class.vue'

import Cookies  from 'cookies-js'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        isAuth: true
      }
    },
    {
      path: '/panel',
      name: 'panel',
      redirect: '/panel/tablero',
      component: Panel,
      meta: {
        requiredAuth: true
      },
      children: [
        {
          path: 'tablero',
          name: 'tablero',
          component: Tablero,
          meta: {
            requiredAuth: true
          },
        },
        {
          path: 'class',
          name: 'class',
          component: Class,
          meta: {
            requiredAuth: true
          },
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {

  if (to.meta.requiredAuth) {
    let userId = Cookies.get('userId')
    console.log(userId)
    if (userId) {
      next()
    } else {
      router.push('/')
    }
  } else {
    next()
  }

  if (to.meta.isAuth) {
    let userId = Cookies.get('userId')
    if (userId) {
      router.push('/panel')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
