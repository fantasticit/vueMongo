import http from './config';

class Connect {
  static async getConnect (db, url) {
    const data = await http({
      method: 'post',
      url: '/db/connect',
      data: {db, url}
    })
  
    return data
  }


  /**
   * 获取数据库集合状态
   * @param {*} db 
   */
  static async getDBCollectionStats(db) {
    try {
      const data = await http({
        method: 'get',
        url: `/db/${db}`,
      })

      return data
    }  catch (err) {
      throw new Error(err)
    }
  }
}

export default Connect;
