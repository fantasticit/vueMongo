var Promise = require("bluebird");
var MongoDB = require("mongodb");
Promise.promisifyAll(MongoDB);

const MongoClient = require('mongodb').MongoClient;
const connections = {};

function findAll(collection, skip, limit) {
  return new Promise(async (resolve, reject) => {
    const total = await collection.count();

    collection.find().skip(skip).limit(limit).toArray(function (err, docs) {
      if (err) {
        reject(err)
      } else {
        setTimeout(_ => resolve({ docs, total }), 3000)
      }
    })
  })
}

module.exports = class Connect {
  static async createConnect(ctx) {
    let { name, url } = ctx.request.body;

    const connect = await MongoClient.connect(url).catch(err => console.log(err))
    connections[name] = connect.db(name);
    const collections = await connections[name].collections({});
    const collectionsName = collections.map(collection => collection.s.name);
    
    ctx.body = collectionsName;
  }

  static async findAll(ctx) {
    const { db, collection } = ctx.params;
    let { page, pageSize } = ctx.query;
    page = +page;
    pageSize = +pageSize;
    const skip = page > 1 ? (page - 1) * pageSize : 0;

    const data = await findAll(connections[db].collection(collection), skip, pageSize)
    ctx.body = data;
  }
}
