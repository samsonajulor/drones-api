import { expect } from '@jest/globals';
import { DroneService } from '../service';

it('checks if there are more than 10 drones in the database', async () => {
  const drones = await DroneService.getAll();
  expect(drones.length).toBeLessThanOrEqual(10);
});
