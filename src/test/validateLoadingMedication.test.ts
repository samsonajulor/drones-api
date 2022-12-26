import { expect } from '@jest/globals';
import request from 'supertest';
import server from '../app';

it ('checks if the name contains invalid characters', async () => {
 const sample = {
  "name": "The_Best_Drone+123",
  weight: 100
 };
 const { body } = await request(server).post('/dispatch/v1.0/api/medication').send(sample);

 const { status, responseCode } = body;
 expect(status).toBe('fail');
 expect(responseCode).toBe('01');
});

it ('checks if the code contains small letters', async () => {
 const sample = {
  "name": "TheBestDrone",
  "code": "theBestCode",
  "weight": 100
 };
 const { body } = await request(server).post('/dispatch/v1.0/api/medication').send(sample);

 const { status, responseCode } = body;
 expect(status).toBe('fail');
 expect(responseCode).toBe('01');
});

it ('checks if the code contains invalid characters', async () => {
 const sample = {
  "name": "TheBestDrone",
  "code": "AVIC+123",
  "weight": 100
 };
 const { body } = await request(server).post('/dispatch/v1.0/api/medication').send(sample);

 const { status, responseCode } = body;
 expect(status).toBe('fail');
 expect(responseCode).toBe('01');
});
