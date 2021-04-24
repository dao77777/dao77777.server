'use strict';

module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      console.log(error);
      ctx.helper.send(500, '服务器发生错误', null);
    }
  };
};
