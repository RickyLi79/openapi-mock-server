import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  openapiRouter: {
    enable: true,
    package: 'egg-openapi-router',
  },

};

export default plugin;
