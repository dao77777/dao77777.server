'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // test
  router.post('/ui/index/test', controller.ui.index.test);

  // home
  router.post('/ui/home/getArticleCardArray', controller.ui.home.getArticleCardArray);
  router.post('/ui/home/routerLink/blogLink/getAuthorInfo', controller.ui.home.routerLink_blogLink_getAuthorInfo);
  router.post('/ui/home/articleCard/updateClickCount', controller.ui.home.articleCard_updateClickCount);

  // article
  router.post('/ui/article/content/getArticle', controller.ui.article.content_getArticle);
  router.post('/ui/article/comment/getComment', controller.ui.article.comment_getComment);
  router.post('/ui/article/comment/insertCommit', controller.ui.article.comment_insertCommit);
  router.post('/ui/article/comment/commentCard/insertCommit', controller.ui.article.comment_commentCard_insertCommit);
};
