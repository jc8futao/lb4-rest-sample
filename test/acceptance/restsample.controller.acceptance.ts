import {Client, expect} from '@loopback/testlab';
import {RestServiceApplication} from '../..';
import {setupApplication} from '../helpers';

describe('RestSampleController', () => {
  let app: RestServiceApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /rest', async () => {
    const res = await client.get('/rest').expect(200);
    expect(res.body).to.be.Array();
  });

  it('invokes GET /rest', async () => {
    const res = await client.get('/rest/1').expect(200);
    expect(res.body).to.be.Object();
  });
});
