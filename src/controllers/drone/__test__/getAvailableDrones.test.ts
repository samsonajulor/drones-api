import { expect } from '@jest/globals';
import request from 'supertest';
import server from '../../../app';

it('displays the list of drones with state as IDLE or LOADING', async () => {
  const { body } = await request(server).get('/dispatch/v1.0/api/drone/idle');
  const { status, responseCode } = body;

  expect(status).toBe('success');
  expect(responseCode).toBe('00');
});
