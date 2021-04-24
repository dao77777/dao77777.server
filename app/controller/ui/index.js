'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  async test() {
    const { ctx } = this;
    console.log(ctx.request.body);
    console.log(ctx.request.protocol);
    console.log(ctx.request.host);
    console.log(ctx.request.path);
    console.log(ctx.request.query);
    console.log(ctx.request.ip);
    console.log(ctx.request.get('Content-Type'));
    console.log(ctx.request.get('User-Agent'));

    ctx.helper.send(200, '请求成功', null);
  }
}

module.exports = IndexController;
