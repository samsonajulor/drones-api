import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { Request, Response } from 'express';
import { UploadsRequest, ErrorType } from '../@types';
import { Toolbox, HttpStatusCode, BaseError } from '../utils';

const { apiResponse, RESPONSE, uploadToCloudinary } = Toolbox;

async function uploads(req: Request, res: Response) {
  try {
    const files = (req as UploadsRequest).files;
    console.log(files);
    const result: Array<UploadApiResponse | UploadApiErrorResponse> = [];

    for await (const file of files) {
      result.push(await uploadToCloudinary(file));
    }

    return apiResponse(
      'uploads',
      res,
      RESPONSE.success,
      HttpStatusCode.OK,
      JSON.stringify(result.map((data) => data.url)),
      'file uploaded successfully'
    );
  } catch (error: ErrorType) {
    console.log(error);
    const httpCode =
      error instanceof BaseError ? error.httpCode : HttpStatusCode.INTERNAL_SERVER_ERROR;
    return apiResponse(
      'uploads',
      res,
      RESPONSE.fail,
      httpCode,
      JSON.stringify(error),
      'uploads api error'
    );
  }
}

export default uploads;
