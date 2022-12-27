import { expect } from '@jest/globals';
import request from 'supertest';
import { DroneType } from '../../../../@types';
import server from '../../../app';
import { DroneService } from '../../../service';

it('attempts to load a medication with a weight above 500', async () => {
  const data = {
    name: 'The Best Drone Ever',
    weight: 501,
    code: 'BUZZ',
  };
  const { body } = await request(server).post('/dispatch/v1.0/api/medication').send(data);
  const { status, responseCode } = body;

  expect(status).toBe('fail');
  expect(responseCode).toBe('01');
});

it('attempts to load a medication with a weight below 500', async () => {
  const data = {
    name: 'The Best Drone Ever',
    weight: 400,
    code: 'BUZZ',
  };
  const { body } = await request(server).post('/dispatch/v1.0/api/medication').send(data);
  const { status, responseCode } = body;

  const size = 500 - data.weight;
  if (size < 0) {
    expect(status).toBe('fail');
    expect(responseCode).toBe('01');
    return;
  }

  const drones = await DroneService.getAvailableDrones();
  if (drones.length === 0) {
    expect(status).toBe('fail');
    expect(responseCode).toBe('01');
    return;
  }

  const weights = drones.map((drone: DroneType) => drone.weight);
  /**find the index of the first drone with weight less than or equal to size */
  const index = weights.findIndex((weight: number) => weight <= size);

  if (index === -1) {
    expect(status).toBe('fail');
    expect(responseCode).toBe('01');
    return;
  }
  const batteries = drones.map((drone: DroneType) => drone.battery);
  /**find the index of the first drone with battery capacity greater than 25 */
  const batteryIndex = batteries.findIndex((battery: number) => battery > 25);

  if (batteryIndex === -1) {
    expect(status).toBe('fail');
    expect(responseCode).toBe('01');
    return;
  }
  const freeDrone = await DroneService.getFreeDrone(data.weight);

  if (!Object.keys(freeDrone).length) {
    expect(status).toBe('fail');
    expect(responseCode).toBe('01');
    return;
  }
});
