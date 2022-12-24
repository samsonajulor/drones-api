import { Request, Response } from 'express';
import { Toolbox, HttpStatusCode, BaseError } from '../../utils';
import { v4 as uuidv4 } from 'uuid';
import { MedicationService } from '../../service';

const { apiResponse, RESPONSE } = Toolbox;

async function loadMedication(req: Request, res: Response) {
  try {
    const { name, weight, code } = req.body;
    const drone = await MedicationService.loadMedication({
      medicationId: uuidv4(),
      name,
      weight,
      code,
    });
    return apiResponse(
      'loadMedication',
      res,
      RESPONSE.success,
      HttpStatusCode.OK,
      JSON.stringify(drone),
      'drone loaded successfully'
    );
  } catch (error) {
    const httpCode =
      error instanceof BaseError ? error.httpCode : HttpStatusCode.INTERNAL_SERVER_ERROR;
    const response =
      error instanceof BaseError
        ? error.message || error
        : 'Some error occurred. Please contact support';
    return apiResponse(
      'loadMedication',
      res,
      RESPONSE.fail,
      httpCode,
      JSON.stringify(response, Object.getOwnPropertyNames(response)),
      'load medications api error'
    );
  }
}

export default loadMedication;
