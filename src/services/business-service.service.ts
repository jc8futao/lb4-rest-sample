import {getService, juggler, GenericService} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {BusinessServiceResponseData} from '../datasources';

export class BusinessServiceProvider implements Provider<GenericService> {
  constructor(
    @inject('datasources.businessservice')
    protected dataSource: juggler.DataSource = new BusinessServiceResponseData(),
  ) {}

  value(): Promise<GenericService> {
    return getService(this.dataSource);
  }
}
