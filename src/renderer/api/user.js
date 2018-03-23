import http from './config';

class User {
  static async getUsers(db) {
    try {
      const data = await http({
        method: 'get',
        url: `/db/${db}/getUsers`
      })

      return data
    }  catch (err) {
      throw new Error(err)
    }
  }

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
        url: `/db/${db}/users/${users.join('|')}`,
      })

      return data
    }  catch (err) {
      throw new Error(err)
    }
  }
}

export default User;
