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

  static async findAll(db, collection, page, pageSize) {
    const data = await http({
      method: 'get',
      url: `/db/${db}/collection/${collection}?page=${page}&pageSize=${pageSize}`,
    })
  
    return data
  }
}

export default Connect;
