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

/*
codemirror plugins
*/
import "codemirror/lib/codemirror.css";
// language js
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/django/django.js";
import "codemirror/mode/go/go.js";
import "codemirror/mode/php/php.js";
import "codemirror/mode/python/python.js";
import "codemirror/mode/sass/sass.js";
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/cmake/cmake.js";
// theme css
import "codemirror/theme/monokai.css";
import "codemirror/theme/paraiso-light.css";

// require active-line.js
import "codemirror/addon/selection/active-line.js";
// styleSelectedText
import "codemirror/addon/selection/mark-selection.js";
import "codemirror/addon/search/searchcursor.js";

// hint
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint.js";
import "codemirror/addon/selection/active-line.js";
// highlightSelectionMatches
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.js";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/match-highlighter.js";
// keyMap
import "codemirror/mode/clike/clike.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/comment/comment.js";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/keymap/sublime.js";
// foldGutter
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/xml-fold.js";
/*
END --> codemirror plugins
*/

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

