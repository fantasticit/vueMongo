var Promise = require("bluebird");
var MongoDB = require("mongodb");
Promise.promisifyAll(MongoDB);

const MongoClient = require('mongodb').MongoClient;
const connectPool = require('./connect-pool');

module.exports = class Connect {
  /**
   * 连接制指定的数据库
   * @param {*} ctx 
   */
  static async createConnect(ctx) {
    let { name, url } = ctx.request.body;

    const connect = await MongoClient.connect(url).catch(err => console.log(err))
    connectPool[name] = connect.db(name);
    const collections = await connectPool[name].collections({});
    const collectionsName = collections.map(collection => collection.s.name);
    
    ctx.body = { code: 'ok', data: collectionsName };
  }
}
