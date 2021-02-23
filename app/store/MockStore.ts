import { SchemaMock } from '@rickyli79/json-schema-mock';

class MockStoreStatic {
  operation:{
    [id:string]:{
      successStatus:string[],
      failedStatus:string[],
    }
  } = {};

  SchemaMock:{
    [id:string]:SchemaMock;
  } = {};
}

export const MockStore = new MockStoreStatic();
