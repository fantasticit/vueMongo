import http from './config';

class DB {
  static async createUser(db, user) {
    try {
      const data = await http({
        method: 'post',
        url: `/db/${db}/createUser`,
        data: user
      })

      return data
    }  catch (err) {
      throw new Error(err)
    }
  }

  static async deleteUser(db, users) {
    try {
      const data = await http({
        method: 'delete',
        url: `/db/${db}/deleteUser`,
        data: users
      })

      return data
    }  catch (err) {
      throw new Error(err)
    }
  }
}

export default DB;
