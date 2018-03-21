import http from './config';

class Connect {
  static async getConnect (db, url) {
    const data = await http({
      method: 'post',
      url: '/db/connect',
      data: {name: db, url}
    })
  
    return data
  }

  static async findAll(db, collection, query, page, pageSize) {
    try {
      const data = await http({
        method: 'get',
        url: `/db/${db}/collection/${collection}?query=${query}&page=${page}&pageSize=${pageSize}`,
      })
    
      return data
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  }
}

export default Connect;
