'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async getArticleCardArray(pageNum) {
    const { app: { mysql } } = this;
    const begin = 10 * (pageNum - 1);
    const count = 10;

    const res = await mysql.query('select * from (select a.id, a.title, a.introduce, a.clickCount, a.readCount, a.likeCount, a.timeCreate, d.categoryName, e.tagName from (select a.*, count(b.id) as likeCount from (select a.*, count(b.id) as readCount from (select * from article order by timeCreate desc limit ?,?) as a left join article_visitor_read as b on a.id=b.article_id group by a.id) as a left join article_visitor_like as b on a.id=b.article_id group by a.id) as a left join article_category as b on a.id=b.article_id left join article_tag as c on a.id=c.article_id left join category as d on b.category_id=d.id left join tag as e on c.tag_id=e.id) as a order by timeCreate desc;', [ begin, count ]);
    return { status: 200, statusMessage: '请求成功', data: res };
  }

  async articleCard_updateClickCount(id) {
    const { app: { mysql } } = this;

    await mysql.query('update article set clickCount=clickCount+1 where id=?', [ id ]);
    return { status: 200, statusMessage: '请求成功', data: null };
  }
}

module.exports = HomeService;
