import connect from './connect';
import query from './query';

const http = {};

http.install = Vue => {
  Vue.prototype.$http = { query, connect, }
}

export default http;
