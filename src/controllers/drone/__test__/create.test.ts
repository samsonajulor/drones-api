import chai from 'chai';
import request from 'supertest';
import server from '../../../index';

const { expect } = chai;

describe('Get available drones', async () => {
  it('displays the list of drones with state as IDLE or LOADING', async () => {
    const { status } = await request(server).get('/dispatch/v1.0/api/drone/idle');
    expect(status).to.equal('success');
  });
});
