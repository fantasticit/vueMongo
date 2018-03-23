const Promise = require("bluebird");
const MongoDB = require("mongodb");
Promise.promisifyAll(MongoDB);
const MongoClient = require('mongodb').MongoClient;
const connectPool = require('./connect-pool');

/**
 * 连接指定的数据库并返回数据库中的集合
 */
function connectDB(db, url) {
  return new Promise(async (resolve, reject) => {
    try {
      const connect = await MongoClient.connect(url);
      connectPool[db] = connect.db(db);

      const collections = await connectPool[db].collections({});
      resolve(collections);
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = class Connect {
  /**
   * 连接制指定的数据库
   * @param {*} ctx 
   */
  static async createConnect(ctx) {
    let { db, url } = ctx.request.body;
    const collections = await connectDB(db, url);
    const collectionsName = collections.map(collection => collection.s.name);
    
    ctx.body = { code: 'ok', data: collectionsName };
  }

  /**
   * 获取数据库中所有的集合状态
   * @param {*} ctx 
   */
  static async getDBCollectionsStats(ctx) {
    let { db } = ctx.params;

    if (!connectPool[db]) {
      return ctx.body = { code: 'no', message: '连接失败，请重新连接数据库' };
    }

    const getCollectionStats = collection => {
      return new Promise((resolve, reject) => {
        collection.stats().then(result => resolve(result)).catch(err => reject(err))
      })
    };
    const collections = await connectPool[db].collections({});
    const fns = collections.map(collection => {
      return getCollectionStats(connectPool[db].collection(collection.s.name));
    });
    const collectionStats = await Promise.all(fns);
    ctx.body = { code: 'ok', data: collectionStats };
  }
}
