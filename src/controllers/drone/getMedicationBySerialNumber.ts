import { Request, Response } from 'express';
import { Toolbox, HttpStatusCode, BaseError } from '../../utils';
import { MedicationService } from '../../service';

const { apiResponse, RESPONSE } = Toolbox;

async function getMedicationBySerialNumber(req: Request, res: Response) {
  try {
    const medicationItems = await MedicationService.getMedicationBySerialNumber(
      req.params.droneSerialNumber
    );
    return apiResponse(
      'getMedicationItems',
      res,
      RESPONSE.success,
      HttpStatusCode.OK,
      JSON.stringify(medicationItems),
      'medication items retrieved successfully'
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
      'get medications api error'
    );
  }
}

export default getMedicationBySerialNumber;
