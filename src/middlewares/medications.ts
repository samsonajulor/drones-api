import { Request, Response, NextFunction } from 'express';
import { BaseError, HttpStatusCode, Toolbox } from '../utils';
import { medicationValidations } from '../validations';
import { GetMedicationType } from '../@types';

const { apiResponse, RESPONSE } = Toolbox;

const MedicationMiddleware = {
  async inspectCreate(req: Request, res: Response, next: NextFunction) {
    try {
      await medicationValidations.addNewMedication(req.body);
      next();
    } catch (error) {
      const response =
        error instanceof BaseError
          ? error.message || error
          : 'Some error occurred. Please contact support';
      return apiResponse(
        'inspectCreate',
        res,
        RESPONSE.fail,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        JSON.stringify(response, Object.getOwnPropertyNames(response)),
        'validation failed'
      );
    }
  },
  async inspectGetMedications(req: Request, res: Response, next: NextFunction) {
    try {
      await medicationValidations.getMedicationItems(req.query as GetMedicationType);
      next();
    } catch (error) {
      const response =
        error instanceof BaseError ? error.message : 'Some error occurred. Please contact support';
      return apiResponse(
        'inspectCreate',
        res,
        RESPONSE.fail,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        JSON.stringify(response, Object.getOwnPropertyNames(response)),
        'validation failed'
      );
    }
  },
};

export default MedicationMiddleware;
