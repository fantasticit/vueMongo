const connectPool = require('./connect-pool');

module.exports = class User {
  /**
   * 获取数据库用户
   * @param {*} ctx 
   */
  static async getUsers(ctx) {
    let { db } = ctx.params;

    if (!connectPool[db]) {
      return ctx.body = { code: 'no', message: '连接失败，请重新连接数据库' };
    }

    const users = await connectPool[db].command({ usersInfo: 1 });
    ctx.body = { code: 'ok', data: users.users };
  }

  /**
   * 新建数据库用户
   * @param {*} ctx 
   */
  static async createUser(ctx) {
    const { db } = ctx.params;
    if (!connectPool[db]) {
      return ctx.body = { code: 'no', message: '连接失败，请重新连接数据库' };
    }

    const user = ctx.request.body || {};
    const create = () => {
      return new Promise((resolve, reject) => {
        connectPool[db].addUser(user.user, user.pwd, { "roles": user.roles }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        })
      });
    }

    await create();
    ctx.body = { code: 'ok' };
  }

  /**
   * 删除数据库用户
   * @param {*} ctx 
   */
  static async deleteUser(ctx) {
    let { db, users } = ctx.params;
    if (!connectPool[db]) {
      return ctx.body = { code: 'no', message: '连接失败，请重新连接数据库' };
    }

    users = users.split('|');
    
    users.map(user => {
      connectPool[db].removeUser(user, (err, user) => {
        if (err) {
          ctx.status = 500;
          ctx.body = { code: 'no', message: '删除失败' };
        }
      })
    })

    return ctx.body = { code: 'ok' };
  }
}
