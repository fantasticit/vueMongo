import Vue from 'vue';
import App from './App'
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'highlight.js/styles/googlecode.css';
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

// const {remote} = require('electron')
//   const {Menu, MenuItem} = remote
  
//   const menu = new Menu()
//   menu.append(new MenuItem({label: 'MenuItem1', click() { console.log('item 1 clicked') }}))
//   menu.append(new MenuItem({type: 'separator'}))
//   menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}))
  
//   window.addEventListener('contextmenu', (e) => {
//     e.preventDefault()
//     menu.popup(remote.getCurrentWindow())
//   }, false)
