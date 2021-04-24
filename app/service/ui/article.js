'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
  async content_getArticle(id) {
    const { app: { mysql } } = this;

    const res = await mysql.query('select a.id, a.title, a.introduce, a.clickCount, a.readCount, a.likeCount, a.timeCreate, a.content, a.cover, a.music, d.categoryName, e.tagName from (select a.*, count(b.id) as likeCount from (select a.*, count(b.id) as readCount from (select * from article where id=?) as a left join article_visitor_read as b on a.id=b.article_id group by a.id) as a left join article_visitor_like as b on a.id=b.article_id group by a.id) as a left join article_category as b on a.id=b.article_id left join article_tag as c on a.id=c.article_id left join category as d on b.category_id=d.id left join tag as e on c.tag_id=e.id;', [ id ]);
    return { status: 200, statusMessage: '请求成功', data: res };
  }

  async comment_getComment(id) {
    const { app: { mysql } } = this;

    const res = await mysql.query('select b.* from (select comment_id from article_comment where article_id=?) as a left join `comment` as b on a.comment_id=b.id', [ id ]);
    async function dfs(forest) {
      if (forest.length === 0) {
        return [];
      }

      const childrenForest = await mysql.query('select b.* from (select comment_id_reply from comment_comment where comment_id_replied=?) as a left join `comment` as b on a.comment_id_reply=b.id;', [ forest[0].id ]);
      const rightForest = forest.slice(1);
      delete forest[0].timeUpdate;
      forest[0].children = await dfs(childrenForest);
      return [ forest[0], ...await dfs(rightForest) ];
    }
    const processedRes = await dfs(res);
    return { status: 200, statusMessage: '请求成功', data: processedRes };
  }

  async comment_insertCommit(id, content, nickname, browser, operatingSystem, email, site, timeCreate, timeUpdate) {
    const { app: { mysql } } = this;

    const res = await mysql.query('insert `comment` values (null, ?, ?, ?, ?, ?, ?, ?, ?)', [ content, nickname, browser, operatingSystem, email, site, timeCreate, timeUpdate ]);
    await mysql.query('insert article_comment values (null, ?, ?, ?, ?)', [ id, res.insertId, timeCreate, timeUpdate ]);
    return { status: 200, statusMessage: '请求成功', data: null };
  }

  async comment_commentCard_insertCommit(id, content, nickname, browser, operatingSystem, email, site, timeCreate, timeUpdate) {
    const { app: { mysql } } = this;

    const res = await mysql.query('insert `comment` values (null, ?, ?, ?, ?, ?, ?, ?, ?)', [ content, nickname, browser, operatingSystem, email, site, timeCreate, timeUpdate ]);
    await mysql.query('insert comment_comment values (null, ?, ?, ?, ?)', [ id, res.insertId, timeCreate, timeUpdate ]);
    return { status: 200, statusMessage: '请求成功', data: null };
  }
}

module.exports = ArticleService;
