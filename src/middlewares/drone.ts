import { Request, Response, NextFunction } from 'express';
import { BaseError, HttpStatusCode, Toolbox } from '../utils';
import { droneValidations } from '../validations';

const { apiResponse, RESPONSE } = Toolbox;

const DroneMiddleware = {
  async inspectCreate(req: Request, res: Response, next: NextFunction) {
    try {
      await droneValidations.addNewDrone(req.body);
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
        'create drone validation failed'
      );
    }
  },
};

export default DroneMiddleware;
