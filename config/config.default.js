/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1619147506820_9364';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];

  // security
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // mysql
  config.mysql = {
    // database configuration
    client: {
      // host
      host: '192.168.0.109', // production
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'root',
      // database
      database: 'blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  // cors
  config.cors = {
    // dev
    origin: 'http://localhost:3000',
    // // prod
    // origin: 'http://47.108.190.127:80',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
