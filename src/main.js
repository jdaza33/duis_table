// Import promise and fetch polyfills for IE11
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';

import Vue from 'vue'
import App from './App.vue'
import Session from './Session.vue'
import router from './router'

Vue.config.productionTip = false

const apiKey = '46204402';
const sessionId = '2_MX40NjIwNDQwMn5-MTUzOTc0ODM0NjAxMH41VkhXUm4rdjNSMHEyMWxUYU80VEZacGh-QX4';
const token = 'T1==cGFydG5lcl9pZD00NjIwNDQwMiZzaWc9MDk1YmU1NGU0MjFlNWJkMTA0NDZlMTZkMTBmZWZmNjQxZjA0NDU3NzpzZXNzaW9uX2lkPTJfTVg0ME5qSXdORFF3TW41LU1UVXpPVGMwT0RNME5qQXhNSDQxVmtoWFVtNHJkak5TTUhFeU1XeFVZVTgwVkVaYWNHaC1RWDQmY3JlYXRlX3RpbWU9MTUzOTc0ODM0NiZyb2xlPW1vZGVyYXRvciZub25jZT0xNTM5NzQ4MzQ2LjAxMzYxNzQwMjI5MzY4JmV4cGlyZV90aW1lPTE1NDAzNTMxNDYmY29ubmVjdGlvbl9kYXRhPW5hbWUlM0RKb2hubnk=';

new Vue({
  router,
  render: h => h(Session, {
    props: {
      sessionId,
      apiKey,
      token
    }
  })
}).$mount('#app');

