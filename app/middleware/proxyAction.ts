import { Context } from 'egg';

export default async function(ctx:Context) {

  const res = await ctx.service.mock.mockRepsonse(ctx.method, ctx.path, ctx.oasOperation());

  ctx.status = res.status;

  for (const iField in res.headers) {
    ctx.response.set(iField, String(res.headers[iField]));
  }

  ctx.response.set('x-context-mock-by', '@rickyli79/json-schema-mock');

  if (res.content !== undefined) {
    ctx.body = res.content;
  }
  if (res.contentType !== undefined) {
    ctx.response.set('content-type', res.contentType);
  }

}
