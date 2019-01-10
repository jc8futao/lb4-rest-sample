import {RestServiceApplication} from '../';
import {createRestAppClient, Client} from '@loopback/testlab';

import * as config from '../src/datasources/restsample.datasource.json';

import {RestSampleDataSource} from '../src/datasources/restsample.datasource';
import {ResponseObject} from 'openapi3-ts';

const restConfig = {port: '8000', host: '127.0.0.1'};

export async function givenAConnectedDataSource(): Promise<
  RestSampleDataSource
> {
  // Overriden template URL to check with mock service
  config.operations[0].template.url = `http://${restConfig.host}:${
    restConfig.port
  }/test/rest/{id}`;
  return new RestSampleDataSource(config).connect();
}

const PING_RESPONSE: ResponseObject = {
  description: 'Rest sample response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
      },
    },
  },
};

const restSampleResponse = [
  {userId: 1, id: 1, title: 'delectus aut autem', completed: false},
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
  },
  {userId: 1, id: 3, title: 'fugiat veniam minus', completed: false},
];

export async function setupApplication(): Promise<AppWithClient> {
  const app = new RestServiceApplication({
    rest: restConfig,
  });

  app.route(
    'GET',
    '/test/rest/',
    {responses: {'200': PING_RESPONSE}},
    async () => Promise.resolve(restSampleResponse),
  );
  app.route(
    'GET',
    '/test/rest/1',
    {responses: {'200': PING_RESPONSE}},
    async () => Promise.resolve(restSampleResponse[0]),
  );

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);
  return {app, client};
}

export interface AppWithClient {
  app: RestServiceApplication;
  client: Client;
}
