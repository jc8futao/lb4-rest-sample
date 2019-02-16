import {getService, juggler, GenericService} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {TemplateServiceDataSource} from '../datasources';

export class TemplateServiceProvider implements Provider<GenericService> {
  constructor(
    @inject('datasources.templateservice')
    protected dataSource: juggler.DataSource = new TemplateServiceDataSource(),
  ) {}

  value(): Promise<GenericService> {
    return getService(this.dataSource);
  }
}
