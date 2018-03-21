import http from './config';

class Query {
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
}

export default Query;
