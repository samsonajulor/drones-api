import { Response } from 'express';
import { parse } from 'js2xmlparser';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { logger } from '../config';
import { applicationJsonType, applicationXmlType, APIResponseType, GenericType } from '../@types';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { cloudinaryConfig } from '../config';
import BaseError from './baseError';
import toStream from 'buffer-to-stream';

/**
 * Function for api tools methods
 * @function Toolbox
 */
const Tools = {
  apiResponse: (
    action: string,
    res: Response,
    responseType: boolean,
    statusCode: number,
    data: string,
    message = '',
    rootElement = ''
  ): Response => {
    const status = responseType ? 'success' : 'fail';
    const response: APIResponseType = {
      status,
      responseCode: responseType ? '00' : '01',
      responseMessage: message,
      details: data?.includes('Error: ')
        ? JSON.parse(data.replace(/Error: /g, ''))
        : JSON.parse(data),
    };
    logger(action, data);
    return res.format({
      json: () => {
        res.type(applicationJsonType);
        res.status(statusCode).send(response);
      },
      xml: () => {
        res.type(applicationXmlType);
        res.status(statusCode).send(parse(rootElement || '', response));
      },
      default: () => {
        res.status(StatusCodes.NOT_IMPLEMENTED).send(getReasonPhrase(StatusCodes.NOT_IMPLEMENTED));
      },
    });
  },

  RESPONSE: {
    success: true,
    fail: false,
  },
  async uploadToCloudinary(
    file: Express.Multer.File
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
      return new Promise((resolve) => {
        const upload = cloudinaryConfig.v2.uploader.upload_stream(
          (error: GenericType, result: any) => {
            if (error)
              throw new BaseError(
                'error from the upload to cloudinary util',
                error,
                'uploadToCloudinary',
                500
              );
            resolve(
              result as
                | UploadApiResponse
                | UploadApiErrorResponse
                | Promise<UploadApiResponse | UploadApiErrorResponse>
            );
          }
        );

        toStream(file.buffer).pipe(upload);
      });
    } catch (error) {
      const httpCode = error instanceof BaseError ? error.httpCode : 500;
      throw new BaseError(
        'error from the upload to cloudinary util',
        error,
        'uploadToCloudinary',
        httpCode
      );
    }
  },
};

export default Tools;
