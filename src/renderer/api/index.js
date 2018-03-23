import connect from './connect';
import collection from './collection';
import user from './user';

import db from './db';
import query from './query';

const http = {};

http.install = Vue => {
  Vue.prototype.$http = { query, connect, collection, user, db }
}

export default http;
