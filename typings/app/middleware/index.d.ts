// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportProxyAction from '../../../app/middleware/proxyAction';

declare module 'egg' {
  interface IMiddleware {
    proxyAction: typeof ExportProxyAction;
  }
}
