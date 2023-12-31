import { Request, Response } from 'express';
import { Toolbox, HttpStatusCode, BaseError } from '../../utils';
import { DroneService } from '../../service';

const { apiResponse, RESPONSE } = Toolbox;

async function getAvailableDrones(_req: Request, res: Response) {
  try {
    const drones = await DroneService.getAvailableDrones();
    return apiResponse(
      'getAvailableDrones',
      res,
      RESPONSE.success,
      HttpStatusCode.OK,
      JSON.stringify(drones),
      `There are ${drones.length} drones available.`
    );
  } catch (error) {
    const httpCode =
      error instanceof BaseError ? error.httpCode : HttpStatusCode.INTERNAL_SERVER_ERROR;
    const response =
      error instanceof BaseError
        ? error.message || error
        : 'Some error occurred. Please contact support';
    return apiResponse(
      'getAvailableDrones',
      res,
      RESPONSE.fail,
      httpCode,
      JSON.stringify(response, Object.getOwnPropertyNames(response)),
      'get available drones api error'
    );
  }
}

export default getAvailableDrones;
