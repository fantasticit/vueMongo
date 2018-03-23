import http from './config';

class Collection {
  /**
   * 获取数据库集合状态
   * @param {*} db 
   */
  static async getCollections(db) {
    try {
      const data = await http({
        method: 'get',
        url: `/db/${db}/collections`,
      })

      return data
    }  catch (err) {
      throw new Error(err)
    }
  }

  static async deleteCollection(db, collection) {
    try {
      const data = await http({
        method: 'delete',
        url: `/db/${db}/collection/${collection}`,
      })

      return data
    }  catch (err) {
      throw new Error(err)
    }
  }
}

export default Collection;
