import {juggler} from '@loopback/service-proxy';
import * as config from './content-service.datasource.json';

export class ContentServiceDataSource extends juggler.DataSource {
  static dataSourceName = 'contentservice';

  constructor(dsConfig: object = config) {
    super(dsConfig);
  }
}
