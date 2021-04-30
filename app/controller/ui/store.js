'use strict';

const Controller = require('egg').Controller;

class StoreController extends Controller {
  async getBlogInfo() {
    const { ctx } = this;

    const { status, statusMessage, data } = await ctx.service.ui.store.getBlogInfo();
    const processedData = data[0];
    ctx.helper.send(status, statusMessage, processedData);
  }
}

module.exports = StoreController;
