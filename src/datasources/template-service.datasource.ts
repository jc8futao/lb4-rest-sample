import {juggler} from '@loopback/repository';
import * as config from './template-service.datasource.json';

export class TemplateServiceDataSource extends juggler.DataSource {
  static dataSourceName = 'templateservice';

  constructor(dsConfig: object = config) {
    super(dsConfig);
  }
}
