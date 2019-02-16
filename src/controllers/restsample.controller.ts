import {inject} from '@loopback/context';
import {RestSampleService} from '../services';
import {get, param} from '@loopback/rest';

export class RestSampleController {
  constructor(
    @inject('services.RestSample')
    private restSampleService: RestSampleService,
  ) {}

  @get('/rest')
  getall() {
    console.log(this.restSampleService)
    return Promise.all([
      this.restSampleService.getrestdata(2),
      this.restSampleService.getrestdata(1)
    ]).then((results) => results);
  }

  @get('/rest/{id}')
  getone(@param.path.number('id') id: number) {
    return this.restSampleService.getrestdata(id);
  }
}
