import { expect } from '@jest/globals';
import request from 'supertest';
import server from '../app';
import { DroneService } from '../service';

it('checks if the drone model parsed when creating a drone is valid', async () => {
  const drones = await DroneService.getAll();
  const sampleOne = {
    model: 'Lightweight',
    battery: 100,
  };
  const sampleTwo = {
    model: 'SomeThing Else',
    battery: 50,
  };
  const { body } = await request(server).post('/dispatch/v1.0/api/drone').send(sampleOne);
  const { status, responseCode } = body;
  if (drones.length < 10) {
    expect(status).toBe('success');
    expect(responseCode).toBe('00');
  } else {
    expect(status).toBe('fail');
    expect(responseCode).toBe('01');
  }

  const { body: bodyTwo } = await request(server).post('/dispatch/v1.0/api/drone').send(sampleTwo);
  const { status: statusTwo, responseCode: responseCodeTwo } = bodyTwo;
  if (drones.length < 10) {
    expect(statusTwo).toBe('fail');
    expect(responseCodeTwo).toBe('01');
  } else {
    expect(statusTwo).toBe('fail');
    expect(responseCodeTwo).toBe('01');
  }
});
