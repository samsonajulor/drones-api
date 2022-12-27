import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { BaseError, HttpStatusCode, Toolbox } from '../utils';
import { UploadsRequest } from '../@types';

const { apiResponse, RESPONSE } = Toolbox;

const UploadsMiddleware = {
  async fileExtLimiter(allowedExtArray: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const files = (req as UploadsRequest).files;

        const fileExtensions: string[] = [];
        Object.keys(files).forEach((key) => {
          fileExtensions.push(path.extname(files[key].name));
        });

        /** Are the file extension allowed? */
        const allowed = fileExtensions.every((ext) => allowedExtArray.includes(ext));

        if (!allowed) {
          const message =
            `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replaceAll(
              ',',
              ', '
            );

          return apiResponse(
            'fileExtLimiter',
            res,
            RESPONSE.fail,
            HttpStatusCode.UNPROCESSABLE_ENTITY,
            JSON.stringify(message),
            'file extension limit validation failed'
          );
        }
        next();
      } catch (error) {
        const response =
          error instanceof BaseError
            ? error.message || error
            : 'Some error occurred. Please contact support';
        return apiResponse(
          'fileExtLimiter',
          res,
          RESPONSE.fail,
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          JSON.stringify(response, Object.getOwnPropertyNames(response)),
          'validation failed'
        );
      }
    };
  },
  async fileSizeLimiter(req: Request, res: Response, next: NextFunction) {
    try {
      const MB = 5;
      const FILE_SIZE_LIMIT = MB * 1024 * 1024;
      const files = (req as UploadsRequest).files;

      const filesOverLimit: string[] = [];
      /** Which files are over the limit? */
      Object.keys(files).forEach((key) => {
        if (files[key].size > FILE_SIZE_LIMIT) {
          filesOverLimit.push(files[key].name);
        }
      });

      if (filesOverLimit.length) {
        const properVerb = filesOverLimit.length > 1 ? 'are' : 'is';

        const sentence =
          `Upload failed. ${filesOverLimit.toString()} ${properVerb} over the file size limit of ${MB} MB.`.replaceAll(
            ',',
            ', '
          );

        const message =
          filesOverLimit.length < 3
            ? sentence.replace(',', ' and')
            : sentence.replace(/,(?=[^,]*$)/, ' and');

        return apiResponse(
          'fileSizeLimiter',
          res,
          RESPONSE.fail,
          HttpStatusCode.PAYLOAD_TOO_LARGE,
          JSON.stringify(message),
          'file size limit validation failed'
        );
      }

      next();
    } catch (error) {
      const response =
        error instanceof BaseError
          ? error.message || error
          : 'Some error occurred. Please contact support';
      return apiResponse(
        'fileSizeLimiter',
        res,
        RESPONSE.fail,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        JSON.stringify(response, Object.getOwnPropertyNames(response)),
        'file size limit validation failed'
      );
    }
  },
  async filesPayloadExists(req: Request, res: Response, next: NextFunction) {
    try {
      if (!(req as UploadsRequest).files) return apiResponse(
        'filesPayloadExists',
        res,
        RESPONSE.fail,
        HttpStatusCode.PAYLOAD_TOO_LARGE,
        JSON.stringify('Missing files'),
        'file size limit validation failed'
      );

      next();
    } catch (error) {
      const response =
        error instanceof BaseError
          ? error.message || error
          : 'Some error occurred. Please contact support';
      return apiResponse(
        'filesPayloadExists',
        res,
        RESPONSE.fail,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        JSON.stringify(response, Object.getOwnPropertyNames(response)),
        'file size limit validation failed'
      );
    }
  },
};

export default UploadsMiddleware;
