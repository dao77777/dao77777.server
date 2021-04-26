'use strict';

module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      console.log(error);
      ctx.helper.send(500, '请求失败', null);
    }
  };
};
