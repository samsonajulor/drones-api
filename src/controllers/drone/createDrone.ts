import { Request, Response } from 'express';
import { Toolbox, APIError, HttpStatusCode } from '../../utils';
import { DroneService } from '../../service';

const { apiResponse, RESPONSE, generateSerialNumber } = Toolbox;

async function createDrone(req: Request, res: Response) {
  try {
    const { model, weight, battery } = req.body;
    const serialNumber = generateSerialNumber();
    const newDrone = await DroneService.createDrone({ serialNumber, model, weight, battery });
    return apiResponse('createDrone', res, RESPONSE.success, HttpStatusCode.OK, JSON.stringify(newDrone));
  } catch (error) {
    const response =
      error instanceof APIError ? error.message || error : 'Internal server error. Please contact support.';
    return apiResponse(
      'createDrone',
      res,
      RESPONSE.fail,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      JSON.stringify(response, Object.getOwnPropertyNames(error)),
    );
  }
}

export default createDrone;
