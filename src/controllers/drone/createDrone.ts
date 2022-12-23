import { Request, Response } from 'express';
import { Toolbox, HttpStatusCode, BaseError } from '../../utils';
import { DroneService } from '../../service';

const { apiResponse, RESPONSE, generateSerialNumber } = Toolbox;

async function createDrone(req: Request, res: Response) {
  try {
    const { model, battery } = req.body;
    const serialNumber = generateSerialNumber();
    const newDrone = await DroneService.createDrone({ serialNumber, model, weight: 0, battery, state: 'IDLE' });
    return apiResponse('createDrone', res, RESPONSE.success, HttpStatusCode.OK, JSON.stringify(newDrone), 'drone created successfully');
  } catch (error) {
      const httpCode = error instanceof BaseError ? error.httpCode : HttpStatusCode.INTERNAL_SERVER_ERROR;
      const response =
        error instanceof BaseError
          ? error.message || error
          : 'Some error occurred. Please contact support';
      return apiResponse(
        'createDrone',
        res,
        RESPONSE.fail,
        httpCode,
        JSON.stringify(response, Object.getOwnPropertyNames(response)),
        'creating drone api error'
      );
  }
}

export default createDrone;
