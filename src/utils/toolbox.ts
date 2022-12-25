import { Response } from 'express';
import { parse } from 'js2xmlparser';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { logger } from '../config';
import { applicationJsonType, applicationXmlType, APIResponseType } from '../@types';

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
      details: data.includes('Error: ')
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

  generateSerialNumber(): string {
    return `REF-${new Date().valueOf()}${Math.floor(10000 + Math.random() * 90000)}`;
  },

  RESPONSE: {
    success: true,
    fail: false,
  },
};

export default Tools;
