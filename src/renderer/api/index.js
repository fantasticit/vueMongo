import connect from './connect';
import collection from './collection';
import user from './user';
import query from './query';

const http = {};

http.install = Vue => {
  Vue.prototype.$http = { query, connect, collection, user, }
}

export default http;
