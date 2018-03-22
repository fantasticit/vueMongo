const Util = require('./util');
const connectPool = require('./connect-pool');

module.exports = class Query {
  static async findAll(ctx) {
    const { db, collection } = ctx.params;
    let { query, page, pageSize } = ctx.query;
    page = +page;
    pageSize = +pageSize;
    const skip = page > 1 ? (page - 1) * pageSize : 0;

    if (!connectPool[db]) {
      return ctx.body = { code: 'no', message: '连接失败，请重新连接数据库' };
    }

    const data = await Util.findAll(connectPool[db].collection(collection), query, skip, pageSize)
    ctx.body = { code: 'ok', data };
  }

  static async findById(ctx) {
    const { db, collection, document } = ctx.params;
    if (!connectPool[db]) {
      return ctx.body = { code: 'no', message: '连接失败，请重新连接数据库' };
    }

    const data = await Util.findById(connectPool[db].collection(collection), document)
    ctx.body = { code: 'ok', data };
  }

  // 目前(2018-03-22)通过替换的方法完成文档更新
  static async updateById(ctx) {
    const { db, collection, document } = ctx.params;
    if (!connectPool[db]) {
      return ctx.body = { code: 'no', message: '连接失败，请重新连接数据库' };
    }

    const data = await Util.updateById(connectPool[db].collection(collection), ctx.request.body)
    ctx.body = { code: 'ok', data };
  }

  static async deleteById(ctx) {
    const { db, collection, document } = ctx.params;
    if (!connectPool[db]) {
      return ctx.body = { code: 'no', message: '连接失败，请重新连接数据库' };
    }

    const data = await Util.deleteById(connectPool[db].collection(collection), document)
    ctx.body = { code: 'ok', data };
  }

  static async insert(ctx) {
    const { db, collection } = ctx.params;
    if (!connectPool[db]) {
      return ctx.body = { code: 'no', message: '连接失败，请重新连接数据库' };
    }

    const data = await Util.insert(connectPool[db].collection(collection), ctx.request.body)
    ctx.body = { code: 'ok', data };
  }
}
