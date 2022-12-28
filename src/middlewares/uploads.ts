import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { HttpStatusCode, Toolbox } from '../utils';
import { ErrorType, GenericType, UploadsRequest } from '../@types';
import { logger } from '../config';

const { apiResponse, RESPONSE } = Toolbox;

const UploadsMiddleware = {
  fileExtLimiter(allowedExtArray: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const files = (req as UploadsRequest).files;

        const fileExtensions: string[] = [];
        files.forEach((file: GenericType) => fileExtensions.push(path.extname(file.originalname)));
        logger('check fileExtensions', JSON.stringify(fileExtensions));

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
      } catch (error: ErrorType) {
        return apiResponse(
          'fileExtLimiter',
          res,
          RESPONSE.fail,
          HttpStatusCode.BAD_REQUEST,
          JSON.stringify(error.message),
          'file extension limit validation failed'
        );
      }
    };
  },
  fileSizeLimiter(req: Request, res: Response, next: NextFunction) {
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
    } catch (error: ErrorType) {
      return apiResponse(
        'fileSizeLimiter',
        res,
        RESPONSE.fail,
        HttpStatusCode.BAD_REQUEST,
        JSON.stringify(error.message),
        'file size limit validation failed'
      );
    }
  },
  filesPayloadExists(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(Object.keys(req.files as GenericType)[0], 'files');
      if (!(req as UploadsRequest).files.length)
        return apiResponse(
          'filesPayloadExists',
          res,
          RESPONSE.fail,
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          JSON.stringify('Missing files'),
          'file payload validation failed'
        );
      next();
    } catch (error: ErrorType) {
      return apiResponse(
        'filesPayloadExists',
        res,
        RESPONSE.fail,
        HttpStatusCode.BAD_REQUEST,
        JSON.stringify(error.message),
        'file payload validation failed'
      );
    }
  },
};

export default UploadsMiddleware;
