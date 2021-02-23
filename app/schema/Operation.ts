import { Schema } from '@rickyli79/koa-openapi-router';
export interface OperationBase {

  'x-oas-ver': 2 | 3;

  operationId?: string;
  parameters?: {
    name: string;
    in: 'path' | 'query' | 'header' | 'cookie' | 'body',
    schema: Schema;
    required?: boolean;
  }[],


}
export interface OperationV2 extends OperationBase {
  'x-oas-ver': 2;

  consumes?: string[];
  produces?: string[];

  responses: {
    [status: string]: {
      description: string,
      headers?: {
        [field: string]: Schema;
      };
      schema?: Schema;
    }
  },
}
export interface OperationV3 extends OperationBase {

  'x-oas-ver': 3;

  operationId?: string;

  responses: {
    [status: string]: {
      description: string,
      headers?: {
        [field: string]: {
          required?: boolean;
          schema: Schema;
        }
      };
      content?: {
        [contentType: string]: {
          schema?: Schema;
        }
      }
    }
  },
}
