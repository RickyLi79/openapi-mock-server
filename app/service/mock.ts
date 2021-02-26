import { SchemaMock } from '@rickyli79/json-schema-mock';
import { Service } from 'egg';
import * as Mockjs from 'mockjs';
import { IMockResponse } from '../schema/IMockResponse';
import { OperationV2, OperationV3 } from '../schema/Operation';
import { MockStore } from '../store/MockStore';

export default class extends Service {

  async mockRepsonse(method: string, routePath: string, opt: OperationV2 | OperationV3): Promise<IMockResponse> {

    const id = method.toUpperCase() + ' ' + routePath;
    let optCache = MockStore.operation[id];
    const oasVer = opt['x-oas-ver'];
    if (optCache === undefined) {
      const responseKeys = Object.keys(opt.responses);
      const successStatus: string[] = [];
      const failedStatus: string[] = [];
      for (const iResKey of responseKeys) {
        const status = Number.parseInt(iResKey);
        if (!Number.isNaN(status)) {
          if (status < 400) {
            successStatus.push(iResKey);
          } else {
            failedStatus.push(iResKey);
          }
        } else {
          failedStatus.push(iResKey);
        }
      }
      optCache = MockStore.operation[id] = { successStatus, failedStatus };
    }
    let toStatus: string;
    if (optCache.successStatus.length > 0) {
      toStatus = Mockjs.Random.pick(optCache.successStatus);
    } else {
      toStatus = Mockjs.Random.pick(optCache.failedStatus);
    }

    // #region headers
    const headersSpec = opt.responses[toStatus].headers;
    const headers: { [field: string]: string } = {};
    if (headersSpec !== undefined) {
      for (const iField in headersSpec) {
        const iHeader = headersSpec[iField];
        let required = oasVer === 3 ? (iHeader.required ?? false) : true;
        if (!required) {
          required = Mockjs.Random.boolean();
        }
        if (required) {
          const schema = oasVer === 3 ? (<any>iHeader).schema : iHeader;
          const sm = await SchemaMock.parser(schema);
          headers[iField] = sm.mock({ defaultAdditionalItems: false });
        }
      }
    }
    // #endregion

    // #region content
    const contentSpec = oasVer === 3 ? (opt as OperationV3).responses[toStatus].content : (opt as OperationV2).responses[toStatus];
    let content: any = opt.responses[toStatus].description;
    let contentType: string | undefined;
    if (contentSpec !== undefined) {
      contentType = Mockjs.Random.pick(
        oasVer === 3 ? Object.keys(contentSpec) : (opt as OperationV2).produces ?? [ undefined ],
      );
      const smId = `${id}#${toStatus}#${contentType}`;
      let sm = MockStore.SchemaMock[smId];
      if (sm === undefined) {
        const schema = oasVer === 3 ? contentSpec[contentType!].schema : contentSpec.schema;
        if (schema !== undefined) {
          sm = MockStore.SchemaMock[smId] = await SchemaMock.parser(schema);
        }
      }
      content = sm.mock({ defaultAdditionalItems: false });
    }
    // #endregion

    let status = Number.parseInt(toStatus);
    if (Number.isNaN(status)) {
      status = 500;
    }
    return { status, headers, contentType, content };
  }
}
