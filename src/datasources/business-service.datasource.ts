import {juggler} from '@loopback/service-proxy';
import * as config from './business-service.datasource.json';

export class BusinessServiceResponseData extends juggler.DataSource {
  static dataSourceName = 'businessservice';

  constructor(dsConfig: object = config) {
    super(dsConfig);
  }
}
