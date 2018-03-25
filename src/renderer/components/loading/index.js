import Vue from 'vue';
import loading from './main.vue';

const Ctur = Vue.extend(loading);
let instance = null;

const Loading = {
  start () {
    if (instance) {
      instance.visible = false;
    }

    instance = new Ctur().$mount();
    document.body.appendChild(instance.$el);
    Vue.nextTick(_ => instance.visible = true);
  },

  close () {
    setTimeout(_ => instance.visible = false, 300)
  },
};

export default Loading;
