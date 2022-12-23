import { Request, Response } from 'express';
import { Toolbox, HttpStatusCode, BaseError } from '../../utils';
import { v4 as uuidv4 } from 'uuid';
import { MedicationService } from '../../service';

const { apiResponse, RESPONSE } = Toolbox;

async function loadDroneWithMedication(req: Request, res: Response) {
  try {
    const { name, weight, code } = req.body;
    const drone = await MedicationService.loadDroneWithMedication({
     medicationId: uuidv4(),
     name,
     weight,
     code,
    });
    return apiResponse(
      'loadDroneWithMedication',
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
      'loadDroneWithMedication',
      res,
      RESPONSE.fail,
      httpCode,
      JSON.stringify(response, Object.getOwnPropertyNames(response)),
      'creating drone api error'
    );
  }
}

export default loadDroneWithMedication;
