import { HttpStatusCode } from '../@types';
import BaseError from './baseError';

export default class APIError extends BaseError {
  constructor(
    message: string,
    methodName = '',
    httpCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
    isOperational = true
  ) {
    super('', message, methodName, httpCode, isOperational);
  }
}
