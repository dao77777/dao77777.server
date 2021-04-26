'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async getArticleCardArray() {
    const { ctx } = this;
    const { pageNum } = ctx.request.body;

    const { status, statusMessage, data } = await ctx.service.ui.home.getArticleCardArray(pageNum);
    const processedData = ctx.helper.articleProcess(data);
    ctx.helper.send(status, statusMessage, processedData);
  }

  async routerLink_blogLink_getAuthorInfo() {
    const { ctx } = this;

    const { status, statusMessage, data } = await ctx.service.ui.home.routerLink_blogLink_getAuthorInfo();
    const processedData = data[0];
    ctx.helper.send(status, statusMessage, processedData);
  }

  async articleCard_updateClickCount() {
    const { ctx } = this;
    const { id } = ctx.request.body;

    const { status, statusMessage, data } = await ctx.service.ui.home.articleCard_updateClickCount(id);
    ctx.helper.send(status, statusMessage, data);
  }
}

module.exports = HomeController;
