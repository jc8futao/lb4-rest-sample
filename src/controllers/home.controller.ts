import {inject} from '@loopback/context';
import {get} from '@loopback/rest';
import {GenericService} from '@loopback/service-proxy';

export class ContentServiceController {
  constructor(
    @inject('services.ContentService')
    private contentServiceService: GenericService,
    @inject('services.BusinessService')
    private businessServiceService: GenericService,
    @inject('services.TemplateService')
    private templateServiceService: GenericService,
  ) {}

  @get('/ae/english', {
    responses: {
      '200': {
        description: 'greeting text',
        content: {
          'text/html': {
            schema: {type: 'string'},
          },
        },
      },
    },
  })
  async getall() {
    // tslint:disable-next-line:no-any
    const services: any = {
      'managed-content': this.contentServiceService.getpage(),
      publications: this.contentServiceService.getpublication(),
      // "incidents": this.businessServiceService.getincidents(),
      'featured-fares': this.businessServiceService.getfeaturedfares(),
      'opertational-updates': this.businessServiceService.getoperationaldata(),
      'special-offers': this.businessServiceService.getspecialoffers(),
    };

    // tslint:disable-next-line:no-any
    let calls: any = [];
    Object.keys(services).map((service: string) =>
      calls.push(services[service]),
    );

    return await Promise.all(calls).then(results => {
      // tslint:disable-next-line:no-any
      let servicesResponse: any = {
        results: {},
      };
      let i = 0;
      Object.keys(services).map((service: string) => {
        servicesResponse.results[service] = results[i];
        i++;
      });
      servicesResponse.results.incidents = {};
      servicesResponse.results.session = {};
      servicesResponse.results.geoip = {};
      servicesResponse.results.urlparser = {
        results: {
          url: 'http://eol.dev.ekgroup.local/ae/english/',
          protocol: 'http',
          host: 'eol.dev.ekgroup.local',
          hostname: 'eol.dev.ekgroup.local',
          port: 80,
          path: '/ae/english/index',
          country: 'ae',
          countryCompat: 'ae',
          language: 'english',
          langCode: 'en',
          countryLang: 'en-ae',
          countryLangCompat: 'en-ae',
          langCountryCompat: 'en-ae',
          countryIsGlobal: false,
          contentPath: '/index',
          directory: '/',
          filename: 'index',
          query: {
            raw: 'true',
          },
        },
      };

      return this.templateServiceService.gettemplate(servicesResponse);
    });
  }
}
