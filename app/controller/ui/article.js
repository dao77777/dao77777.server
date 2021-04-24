'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async content_getArticle() {
    const { ctx } = this;
    const { id } = ctx.request.body;

    const { status, statusMessage, data } = await ctx.service.ui.article.content_getArticle(id);
    const processedData = ctx.helper.articleProcess(data);
    ctx.helper.send(status, statusMessage, processedData);
  }

  async comment_getComment() {
    const { ctx } = this;
    const { id } = ctx.request.body;

    const { status, statusMessage, data } = await ctx.service.ui.article.comment_getComment(id);
    const processedData = processComment(data);
    function processComment(comment) {
      function dfs(forest) {
        if (forest.length === 0) {
          return;
        }

        forest[0].timeCreate = forest[0].timeCreate.getTime();
        const rightForest = forest.slice(1);
        const childrenForest = forest[0].children;
        dfs(rightForest);
        dfs(childrenForest);
      }

      dfs(comment);
      return comment;
    }
    ctx.helper.send(status, statusMessage, processedData);
  }

  async comment_insertCommit() {
    const { ctx } = this;
    const { id, nickname, email, site, content } = ctx.request.body;
    const browser = ctx.request.get('User-Agent');
    const operatingSystem = ctx.request.get('User-Agent');
    const timeCreate = new Date();
    const timeUpdate = timeCreate;

    const { status, statusMessage, data } = await ctx.service.ui.article.comment_insertCommit(id, content, nickname, browser, operatingSystem, email, site, timeCreate, timeUpdate);
    ctx.helper.send(status, statusMessage, data);
  }

  async comment_commentCard_insertCommit() {
    const { ctx } = this;
    const { id, nickname, email, site, content } = ctx.request.body;
    const browser = ctx.request.get('User-Agent');
    const operatingSystem = ctx.request.get('User-Agent');
    const timeCreate = new Date();
    const timeUpdate = timeCreate;

    const { status, statusMessage, data } = await ctx.service.ui.article.comment_commentCard_insertCommit(id, content, nickname, browser, operatingSystem, email, site, timeCreate, timeUpdate);
    ctx.helper.send(status, statusMessage, data);
  }
}

module.exports = ArticleController;
