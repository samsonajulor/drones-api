import { Request, Response, NextFunction } from 'express';
import { APIError, HttpStatusCode, Toolbox } from '../utils';
import { medicationValidations } from '../validations';
import { GetMedicationType } from '../@types';

const { apiResponse, RESPONSE } = Toolbox;

const MedicationMiddleware = {
  async inspectCreateMedication(req: Request, res: Response, next: NextFunction) {
    try {
      await medicationValidations.addNewMedication(req.body);
      next();
    } catch (error) {
      const response =
        error instanceof APIError
          ? error.message || error
          : 'Some error occurred. Please contact support';
      return apiResponse(
        'inspectCreateDrone',
        res,
        RESPONSE.fail,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        JSON.stringify(response, Object.getOwnPropertyNames(error))
      );
    }
  },
  async inspectGetMedications(req: Request, res: Response, next: NextFunction) {
    try {
      await medicationValidations.getMedicationItems(req.query as GetMedicationType);
      next();
    } catch (error) {
      const response =
        error instanceof APIError
          ? error.message || error
          : 'Some error occurred. Please contact support';
      return apiResponse(
        'inspectCreateDrone',
        res,
        RESPONSE.fail,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        JSON.stringify(response, Object.getOwnPropertyNames(error))
      );
    }
  },
};

export default MedicationMiddleware;
