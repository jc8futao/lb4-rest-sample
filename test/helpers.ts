import {RestServiceApplication} from '../';
import {
  createRestAppClient,
  givenHttpServerConfig,
  Client,
} from '@loopback/testlab';

import {RestSampleDataSource} from '../src/datasources/restsample.datasource';

export async function givenAConnectedDataSource(): Promise<
  RestSampleDataSource
> {
  const restSampleDataSource = new RestSampleDataSource();
  await restSampleDataSource.connect();
  return restSampleDataSource;
}

export async function setupApplication(): Promise<AppWithClient> {
  const app = new RestServiceApplication({
    rest: givenHttpServerConfig(),
  });

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: RestServiceApplication;
  client: Client;
}
