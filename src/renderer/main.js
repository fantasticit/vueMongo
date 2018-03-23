import Vue from 'vue';
import App from './App'
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'highlight.js/styles/googlecode.css';
// import 'jsoneditor/dist/jsoneditor.min.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import './components/icon/index';
import Http from './api/index';


Vue.use(ElementUI);
Vue.component(CollapseTransition.name, CollapseTransition);
Vue.use(Http);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
