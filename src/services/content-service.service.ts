import {getService, juggler, GenericService} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {ContentServiceDataSource} from '../datasources/content-service.datasource';

export class ContentServiceProvider implements Provider<GenericService> {
  constructor(
    @inject('datasources.contentservice')
    protected dataSource: juggler.DataSource = new ContentServiceDataSource(),
  ) {}

  value(): Promise<GenericService> {
    return getService(this.dataSource);
  }
}
