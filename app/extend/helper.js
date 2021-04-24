'use strict';

module.exports = {
  send(status, statusMessage, data) {
    const { ctx } = this;
    ctx.response.status = 200;
    ctx.response.set('Content-Type', 'application/json;charset=utf-8');
    ctx.response.body = {
      status,
      statusMessage,
      data,
    };
  },
  articleProcess(article) {
    return article.map(item => ({ ...item, timeCreate: item.timeCreate.getTime(), tagName: item.tagName === null ? [] : [ item.tagName ] })).reduce((pre, cur) => {
      const filterArr = pre.filter(item => item.id === cur.id);
      if (filterArr.length === 0) {
        return [ ...pre, cur ];
      }
      return [ ...pre.map(item => (item.id === cur.id ? { ...item, tagName: [ ...item.tagName, ...cur.tagName ] } : item)) ];
    }, []);
  },
};
