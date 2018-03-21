const ObjectID = require("bson-objectid");
const connectPool = require('./connect-pool');

function findAll(collection, query = {}, skip, limit) {
  try {
    query = JSON.parse(query)
  } catch (e) {
    query = {}
  }

  return new Promise(async (resolve, reject) => {
    const total = await collection.count();

    collection.find(query).skip(skip).limit(limit).toArray(function (err, docs) {
      if (err) {
        reject(err)
      } else {
        setTimeout(_ => resolve({ docs, total }), 500)
      }
    })
  })
}

function findById(collection, id) {
  id = ObjectID(id)
  
  return new Promise(async (resolve, reject) => {
    collection.find({ "_id": id }).toArray((err, doc) => {
      if (err) {
        reject(err)
      } else {
        console.log(doc)
        setTimeout(_ => resolve(doc), 500)
      }
    })
  })
}

module.exports = class Query {
  static async findAll(ctx) {
    const { db, collection } = ctx.params;
    let { query, page, pageSize } = ctx.query;
    page = +page;
    pageSize = +pageSize;
    const skip = page > 1 ? (page - 1) * pageSize : 0;

    try {
      const data = await findAll(connectPool[db].collection(collection), query, skip, pageSize)
      ctx.body = { code: 'ok', data };
    } catch (err) {
      // 连接丢失，客户端需重连
      ctx.body = { code: 'no', message: '连接失败，请重新连接数据库' }
    }
  }

  static async findById(ctx) {
    console.log('id')
    const { db, collection, document } = ctx.params;

    console.log({ db, collection, document })

    if (!connectPool[db]) {
      return ctx.body = { code: 'no', message: '连接失败，请重新连接数据库' };
    }

    const data = await findById(connectPool[db].collection(collection), document)
    ctx.body = { code: 'ok', data };
  }
}
