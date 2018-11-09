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
import wysiwyg from "vue-wysiwyg";
import editor  from 'vue2-html5-editor'
Vue.use(editor, {
  name: 'vue2-html5-editor'
});

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import VueCkeditor from 'vue-ckeditor5'

/*ClassicEditor.defaultConfig = {
  toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
  language: 'en'
};*/

const options = {
  editors: {
    classic: ClassicEditor,
  },
  name: 'ckeditor'
}

Vue.use(VueCkeditor.plugin, options);



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

Vue.use(wysiwyg, {
  hideModules: { "image": true, "code": true, "removeFormat": true, "headings": true, "table": true, "separator": true }
}); 




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

