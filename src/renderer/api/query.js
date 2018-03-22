import http from './config';

class Query {
  static async findAll(db, collection, query, page, pageSize) {
    try {
      const data = await http({
        method: 'get',
        url: `/db/${db}/collection/${collection}?query=${query}&page=${page}&pageSize=${pageSize}`,
      })
    
      return data
    } catch (err) {
      throw new Error(err)
    }
  }
  
  static async findById(db, collection, id) {
    const req = {
      method: 'get',
      url: `/db/${db}/collection/${collection}/document/${id}`,
    };

    try {
      const data = await http(req);
      return data[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  static async insert(db, collection, data) {
    const req = {
      method: 'post',
      url: `/db/${db}/collection/${collection}/`,
      data
    };

    try {
      const data = await http(req);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async updateById(db, collection, id, data) {
    const req = {
      method: 'post',
      url: `/db/${db}/collection/${collection}/document/${id}`,
      data: JSON.parse(data)
    };

    try {
      const data = await http(req);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async deleteById(db, collection, id) {
    const req = {
      method: 'delete',
      url: `/db/${db}/collection/${collection}/document/${id}`,
    };

    try {
      const data = await http(req);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default Query;
