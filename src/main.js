// Import promise and fetch polyfills for IE11
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';

import Vue from 'vue'
import App from './App.vue'
//import Session from './Session.vue'
import router from './router'
import VueCookie from 'vue-cookie'
import logger from 'vuejs-logger'
import Chat from 'vue-beautiful-chat'
import VuePellEditor from 'vue-pell-editor'


//Buefy
import Buefy from 'buefy'

//CSS Buefy
import 'buefy/dist/buefy.css'



//Config

Vue.use(VueCookie)
Vue.use(Buefy, {
  defaultDayNames: ['D', 'L', 'M', 'Mi', 'J', 'V', 'S'],
  defaultMonthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  defaultFirstDayOfWeek: 1,
  defaultDateFormatter: date => date.toLocaleDateString('es-ES')
})

//Chat
Vue.use(Chat)

//Editor
Vue.use(VuePellEditor)




const loggerOptions = {
  // optional : defaults to true if not specified
  isEnabled: true,
  // required ['debug', 'info', 'warn', 'error', 'fatal']
  logLevel: 'debug',
  // optional : defaults to false if not specified
  stringifyArguments: false,
  // optional : defaults to false if not specified
  showLogLevel: false,
  // optional : defaults to false if not specified
  showMethodName: false,
  // optional : defaults to '|' if not specified
  separator: '|',
  // optional : defaults to false if not specified
  showConsoleColors: false
}

Vue.use(logger, loggerOptions)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

