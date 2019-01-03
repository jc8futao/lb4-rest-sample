import { RestSampleProvider, RestSampleService } from '../../../src/services/restsample.service';
import { givenAConnectedDataSource } from '../../helpers';

import {expect} from '@loopback/testlab';

describe('RestSampleService', () => {
    let restSampleService: RestSampleService;

    before(givenARestSampleService);

    it('get single data', async () => {
        const response = await restSampleService.getrestdata(1);
        expect(response).to.be.Object();
    });

    it('get all data', async () => {
        const response = await restSampleService.getrestdata();
        expect(response).to.be.Array();
    });

    async function givenARestSampleService() {
        let restSampleDataSource = await givenAConnectedDataSource();
        restSampleService = await new RestSampleProvider(
            restSampleDataSource,
        ).value();
    }
});