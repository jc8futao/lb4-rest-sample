import {inject} from '@loopback/context';
import {RestSampleService} from '../services/restsample.service';
import {get, param} from '@loopback/rest';

export class RestSampleController {
  constructor(
    @inject('services.RestSample')
    private restSampleService: RestSampleService,
  ) {}

  @get('/rest')
  getall() {
    return this.restSampleService.getrestdata();
  }

  @get('/rest/{id}')
  getone(@param.path.number('id') id: number) {
    return this.restSampleService.getrestdata(id);
  }
}
