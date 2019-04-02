// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './../node_modules/jquery/dist/jquery.min.js';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './../node_modules/bulma/css/bulma.css';
import './../node_modules/foundation-sites/dist/css/foundation.min.css';
import './../node_modules/foundation-sites/dist/js/foundation.min.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faSignOutAlt, faThumbsUp, faThumbsDown, faFilter, faHeart, faUserEdit, faChevronRight, faHandHoldingHeart, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee, faSignOutAlt, faThumbsUp, faThumbsDown, faFilter, faHeart, faUserEdit, faChevronRight, faHandHoldingHeart, faPaperPlane);

Vue.component('font-awesome-icon', FontAwesomeIcon);



Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

