import { Request, Response } from 'express';
import path from 'path';
import { UploadsRequest } from '../@types';
import { Toolbox, HttpStatusCode, BaseError } from '../utils';
import { GenericType } from '../@types/index';

const { apiResponse, RESPONSE } = Toolbox;

async function uploads(req: Request, res: Response) {
  try {
    const files = (req as UploadsRequest).files;
    console.log(files);

    Object.keys(files).forEach((key) => {
      const filepath = path.join(__dirname, 'files', files[key].name);
      files[key].mv(filepath, (error: GenericType) => {
        const httpCode =
          error instanceof BaseError ? error.httpCode : HttpStatusCode.INTERNAL_SERVER_ERROR;
        const response =
          error instanceof BaseError
            ? error.message || error
            : 'Some error occurred. Please contact support';
        return apiResponse(
          'uploads',
          res,
          RESPONSE.fail,
          httpCode,
          JSON.stringify(response, Object.getOwnPropertyNames(response)),
          'check battery level api error'
        );
      });
    });
    return apiResponse(
      'uploads',
      res,
      RESPONSE.success,
      HttpStatusCode.OK,
      JSON.stringify(Object.keys(files).toString()),
      'file uploaded successfully'
    );
  } catch (error) {
    const httpCode =
      error instanceof BaseError ? error.httpCode : HttpStatusCode.INTERNAL_SERVER_ERROR;
    const response =
      error instanceof BaseError
        ? error.message || error
        : 'Some error occurred. Please contact support';
    return apiResponse(
      'uploads',
      res,
      RESPONSE.fail,
      httpCode,
      JSON.stringify(response, Object.getOwnPropertyNames(response)),
      'check battery level api error'
    );
  }
}

export default uploads;
