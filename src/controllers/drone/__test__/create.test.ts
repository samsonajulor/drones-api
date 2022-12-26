import { expect } from '@jest/globals';
import request from 'supertest';
import server from '../../../app';
import db from '../../../models';

const { Drones } = db;

it('attempts to create a new drone if needed', async () => {
  const totalDrones = await Drones.count();
  const { body } = await request(server).post('/dispatch/v1.0/api/drone');
  const { status, responseCode } = body;

  if (totalDrones < 10) expect(status).toBe('success');
  else {
    expect(status).toBe('fail');
    expect(responseCode).toBe('01');
  }
});
