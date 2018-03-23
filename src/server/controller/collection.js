const Service = require('../service');
const connectPool = require('./connect-pool');

module.exports = class Collection {
  /**
   * 删除集合
   * @param {*} ctx 
   */
  static async deleteCollection(ctx) {
    let { db, collection } = ctx.params;

    if (!connectPool[db]) {
      return ctx.body = { code: 'no', message: '连接失败，请重新连接数据库' };
    }

    await connectPool[db].collection(collection).drop();
    ctx.body = { code: 'ok' };
  }

  /**
   * 获取集合中的文档
   * @param {*} ctx 
   */
  static async findAll(ctx) {
    const { db, collection } = ctx.params;
    let { query, page, pageSize } = ctx.query;
    page = +page;
    pageSize = +pageSize;
    const skip = page > 1 ? (page - 1) * pageSize : 0;

    if (!connectPool[db]) {
      return ctx.body = { code: 'no', message: '连接失败，请重新连接数据库' };
    }

    const data = await Service.findAll(connectPool[db].collection(collection), query, skip, pageSize)
    ctx.body = { code: 'ok', data };
  }

  /**
   * 向集合中新增文档
   * @param {*} ctx 
   */
  static async insert(ctx) {
    const { db, collection } = ctx.params;
    if (!connectPool[db]) {
      return ctx.body = { code: 'no', message: '连接失败，请重新连接数据库' };
    }

    const data = await Service.insert(connectPool[db].collection(collection), ctx.request.body)
    ctx.body = { code: 'ok', data };
  }
}
