import { Request, Response } from 'express';
import { Toolbox, HttpStatusCode, BaseError } from '../../utils';
import { DroneService } from '../../service';

const { apiResponse, RESPONSE } = Toolbox;

async function getAvailableDrones(req: Request, res: Response) {
  try {
    const drones = await DroneService.getIdleDrones();
    return apiResponse(
      'getAvailableDrones',
      res,
      RESPONSE.success,
      HttpStatusCode.OK,
      JSON.stringify(drones),
      'drones retrieved successfully'
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
      'creating drone api error'
    );
  }
}

export default getAvailableDrones;
