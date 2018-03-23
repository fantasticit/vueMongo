const ObjectID = require("bson-objectid");

module.exports = class Util {
  /**
   * 获取集合中的文档
   * @param {*} collection 
   * @param {*} query 
   * @param {*} skip 
   * @param {*} limit 
   */
  static findAll(collection, query = {}, skip, limit) {
    try {
      query = JSON.parse(query);
      query._id && (query._id = ObjectID(query._id));
    } catch (e) {
      query = {};
    }
  
    return new Promise(async (resolve, reject) => {
      const total = await collection.find(query).count();
  
      collection.find(query).skip(skip).limit(limit).toArray(function (err, docs) {
        if (err) {
          reject(err);
        } else {
          resolve({ docs, total });
        }
      })
    })
  }
  
  /**
   * 查询指定Id的数据
   * @param {*} collection 
   * @param {*} id 
   */
  static findById(collection, id) {
    id = ObjectID(id);
    
    return new Promise(async (resolve, reject) => {
      collection.find({ "_id": id }).toArray((err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      })
    })
  }
  
  /**
   * 更新指定Id文档
   * @param {*} collection 
   * @param {*} newDocument 
   */
  static updateById(collection, newDocument) {
    newDocument = JSON.parse(JSON.stringify(newDocument));
    newDocument._id && (newDocument._id = ObjectID(newDocument._id));
  
    return new Promise(async (resolve, reject) => {
      await collection.save(newDocument).catch(err => reject(err));
      resolve('ok')
    });
  }
  
  /**
   * 删除指定Id的文档
   * @param {*} collection 
   * @param {*} id 
   */
  static deleteById(collection, id) {
    return new Promise(async (resolve, reject) => {
      try {
        id = ObjectID(id);
        const result = await collection.deleteOne({"_id": id});
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * 插入文档
   * @param {*} collection 
   * @param {*} document 
   */
  static async insert(collection, document) {
    return new Promise(async (resolve, reject) => {
      try {
        document._id && (document._id = ObjectID(document._id));
        const result = await collection.insert(document);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }
}
