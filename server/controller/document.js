const Service = require('../service');
const connectPool = require('./connect-pool');

module.exports = class Document {
  /**
   * 获取指定Id的文档
   * @param {*} ctx 
   */
  static async findById(ctx) {
    const { db, collection, document } = ctx.params;
    if (!connectPool[db]) {
      return ctx.body = { code: 'no', message: '连接失败，请重新连接数据库' };
    }

    const data = await Service.findById(connectPool[db].collection(collection), document)
    ctx.body = { code: 'ok', data };
  }

  // 目前(2018-03-22)通过替换的方法完成文档更新
  /**
   * 更新指定Id的文档
   * @param {*} ctx 
   */
  static async updateById(ctx) {
    const { db, collection, document } = ctx.params;
    if (!connectPool[db]) {
      return ctx.body = { code: 'no', message: '连接失败，请重新连接数据库' };
    }

    const data = await Service.updateById(connectPool[db].collection(collection), ctx.request.body)
    ctx.body = { code: 'ok', data };
  }

  /**
   * 删除指定Id的文档
   * @param {*} ctx 
   */
  static async deleteById(ctx) {
    const { db, collection, document } = ctx.params;
    if (!connectPool[db]) {
      return ctx.body = { code: 'no', message: '连接失败，请重新连接数据库' };
    }

    const data = await Service.deleteById(connectPool[db].collection(collection), document)
    ctx.body = { code: 'ok', data };
  }
}
