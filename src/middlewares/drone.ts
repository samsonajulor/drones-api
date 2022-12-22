import { Request, Response, NextFunction } from 'express';
import { APIError, HttpStatusCode, Toolbox } from '../utils';
import { droneValidations } from '../validations';

const { apiResponse, RESPONSE } = Toolbox;

const DroneMiddleware = {
  async inspectCreateDrone(req: Request, res: Response, next: NextFunction) {
    try {
      await droneValidations.addNewDrone(req.body);
      next();
    } catch (error) {
      const response =
        error instanceof APIError ? error.message || error : 'Some error occurred. Please contact support';
      return apiResponse(
        'inspectCreateDrone',
        res,
        RESPONSE.fail,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        JSON.stringify(response, Object.getOwnPropertyNames(error)),
      );
    }
  },
};

export default DroneMiddleware;
