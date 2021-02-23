import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1613835107274_2885';

  // add your egg config in here
  config.middleware = [];

  config.openapiRouter = {
    proxyAction: 'proxyAction',
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
  };
};
