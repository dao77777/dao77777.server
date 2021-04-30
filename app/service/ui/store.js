'use strict';

const Service = require('egg').Service;

class StoreService extends Service {
  async getBlogInfo() {
    const { app: { mysql } } = this;

    const res = await mysql.query('select * from blog');
    return { status: 200, statusMessage: '请求成功', data: res };
  }
}

module.exports = StoreService;
