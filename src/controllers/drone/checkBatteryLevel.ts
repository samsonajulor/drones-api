import { Request, Response } from 'express';
import { Toolbox, HttpStatusCode, BaseError } from '../../utils';
import { DroneService } from '../../service';

const { apiResponse, RESPONSE } = Toolbox;

async function checkBatteryLevel(req: Request, res: Response) {
  try {
    const { droneSerialNumber } = req.params;
    const drone = await DroneService.getDroneBySerialNumber(droneSerialNumber);
    return apiResponse(
      'checkBatteryLevel',
      res,
      RESPONSE.success,
      HttpStatusCode.OK,
      JSON.stringify(drone.battery + '%'),
      `battery level of drone ${droneSerialNumber} is ${drone.battery}%`
    );
  } catch (error) {
    const httpCode =
      error instanceof BaseError ? error.httpCode : HttpStatusCode.INTERNAL_SERVER_ERROR;
    const response =
      error instanceof BaseError
        ? error.message || error
        : 'Some error occurred. Please contact support';
    return apiResponse(
      'checkBatteryLevel',
      res,
      RESPONSE.fail,
      httpCode,
      JSON.stringify(response, Object.getOwnPropertyNames(response)),
      'check battery level api error'
    );
  }
}

export default checkBatteryLevel;
