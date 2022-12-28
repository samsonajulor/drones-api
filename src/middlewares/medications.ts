import { Request, Response, NextFunction } from 'express';
import { BaseError, HttpStatusCode, Toolbox } from '../utils';
import { medicationValidations } from '../validations';
import { GetMedicationType, UploadsRequest } from '../@types';

const { apiResponse, RESPONSE } = Toolbox;

const MedicationMiddleware = {
  async inspectCreate(req: Request, res: Response, next: NextFunction) {
    try {
      await medicationValidations.addNewMedication(req.body);
      next();
    } catch (error) {
    const httpCode =
      error instanceof BaseError ? error.httpCode : HttpStatusCode.INTERNAL_SERVER_ERROR;
      const response =
        error instanceof BaseError
          ? error.message || error
          : 'Some error occurred. Please contact support';
      return apiResponse(
        'inspectCreate',
        res,
        RESPONSE.fail,
        httpCode,
        JSON.stringify(response, Object.getOwnPropertyNames(response)),
        'create medication validation failed'
      );
    }
  },
  async inspectGetMedication(req: Request, res: Response, next: NextFunction) {
    try {
      await medicationValidations.getMedication(req.query as GetMedicationType);

      next();
    } catch (error) {
    const httpCode =
      error instanceof BaseError ? error.httpCode : HttpStatusCode.INTERNAL_SERVER_ERROR;
      const response =
        error instanceof BaseError ? error.message : 'Some error occurred. Please contact support';
      return apiResponse(
        'inspectGetMedication',
        res,
        RESPONSE.fail,
        httpCode,
        JSON.stringify(response, Object.getOwnPropertyNames(response)),
        'get medication validation failed'
      );
    }
  },
};

export default MedicationMiddleware;
